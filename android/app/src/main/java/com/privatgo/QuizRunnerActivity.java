package com.privatgo;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.privatgo.models.Quiz;
import com.privatgo.models.QuizQuestion;
import com.privatgo.repository.DataRepository;
import java.util.List;

public class QuizRunnerActivity extends AppCompatActivity {

    private MaterialToolbar toolbar;
    private TextView tvIndex, tvTimer, tvQuestion;
    private RadioGroup rgOptions;
    private RadioButton rbA, rbB, rbC, rbD;
    private MaterialButton btnPrev, btnNext;

    private List<QuizQuestion> questions;
    private int currentIndex = 0;
    private int[] userAnswers;
    private CountDownTimer timer;
    private String quizId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz_runner);

        toolbar = findViewById(R.id.quiz_toolbar);
        tvIndex = findViewById(R.id.tv_question_index);
        tvTimer = findViewById(R.id.tv_quiz_timer);
        tvQuestion = findViewById(R.id.tv_question_text);
        rgOptions = findViewById(R.id.rg_options);
        rbA = findViewById(R.id.rb_opt_a);
        rbB = findViewById(R.id.rb_opt_b);
        rbC = findViewById(R.id.rb_opt_c);
        rbD = findViewById(R.id.rb_opt_d);
        btnPrev = findViewById(R.id.btn_prev_question);
        btnNext = findViewById(R.id.btn_next_question);

        toolbar.setNavigationOnClickListener(v -> finish());

        quizId = getIntent().getStringExtra("quiz_id");
        if (quizId == null) quizId = "qz_1";

        loadQuizData();
        startTimer(15 * 60 * 1000);
        showQuestion(0);

        btnPrev.setOnClickListener(v -> {
            saveCurrentAnswer();
            if (currentIndex > 0) {
                currentIndex--;
                showQuestion(currentIndex);
            }
        });

        btnNext.setOnClickListener(v -> {
            saveCurrentAnswer();
            if (currentIndex < questions.size() - 1) {
                currentIndex++;
                showQuestion(currentIndex);
            } else {
                finishQuiz();
            }
        });
    }

    private void loadQuizData() {
        DataRepository repo = DataRepository.getInstance(this);
        List<Quiz> quizzes = repo.getQuizzes();
        for (Quiz q : quizzes) {
            if (q.getId().equals(quizId)) {
                questions = q.getQuestions();
                toolbar.setTitle(q.getTitle());
                break;
            }
        }
        if (questions == null || questions.isEmpty()) {
            questions = repo.getQuizzes().get(0).getQuestions();
        }
        userAnswers = new int[questions.size()];
        for (int i = 0; i < userAnswers.length; i++) userAnswers[i] = -1;
    }

    private void showQuestion(int index) {
        QuizQuestion q = questions.get(index);
        tvIndex.setText("SOAL " + (index + 1) + " DARI " + questions.size());
        tvQuestion.setText(q.getQuestionText());

        rbA.setText("A. " + q.getOptA());
        rbB.setText("B. " + q.getOptB());
        rbC.setText("C. " + q.getOptC());
        rbD.setText("D. " + q.getOptD());

        rgOptions.clearCheck();
        int ans = userAnswers[index];
        if (ans == 0) rbA.setChecked(true);
        else if (ans == 1) rbB.setChecked(true);
        else if (ans == 2) rbC.setChecked(true);
        else if (ans == 3) rbD.setChecked(true);

        btnPrev.setEnabled(index > 0);
        btnNext.setText(index == questions.size() - 1 ? "Selesai & Kumpulkan" : "Berikutnya →");
    }

    private void saveCurrentAnswer() {
        int checkedId = rgOptions.getCheckedRadioButtonId();
        if (checkedId == R.id.rb_opt_a) userAnswers[currentIndex] = 0;
        else if (checkedId == R.id.rb_opt_b) userAnswers[currentIndex] = 1;
        else if (checkedId == R.id.rb_opt_c) userAnswers[currentIndex] = 2;
        else if (checkedId == R.id.rb_opt_d) userAnswers[currentIndex] = 3;
    }

    private void startTimer(long durationMs) {
        timer = new CountDownTimer(durationMs, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
                long minutes = millisUntilFinished / 60000;
                long seconds = (millisUntilFinished % 60000) / 1000;
                tvTimer.setText(String.format("⏱️ %02d:%02d", minutes, seconds));
            }

            @Override
            public void onFinish() {
                finishQuiz();
            }
        }.start();
    }

    private void finishQuiz() {
        if (timer != null) timer.cancel();
        saveCurrentAnswer();

        int correctCount = 0;
        for (int i = 0; i < questions.size(); i++) {
            QuizQuestion q = questions.get(i);
            int correctIndex = q.getCorrectOpt().equalsIgnoreCase("A") ? 0 :
                               q.getCorrectOpt().equalsIgnoreCase("B") ? 1 :
                               q.getCorrectOpt().equalsIgnoreCase("C") ? 2 : 3;
            if (userAnswers[i] == correctIndex) {
                correctCount++;
            }
        }

        int score = (int) Math.round(((double) correctCount / questions.size()) * 100);
        DataRepository.getInstance(this).saveQuizScore(quizId, score);

        new AlertDialog.Builder(this)
            .setTitle("🎉 Hasil Kuis Selesai!")
            .setMessage("Selamat! Nilai Anda: " + score + " / 100\nBenar: " + correctCount + " dari " + questions.size() + " soal.\n\nNilai Anda telah otomatis tersimpan di rapor lokal!")
            .setCancelable(false)
            .setPositiveButton("Tutup", (dialog, which) -> finish())
            .show();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (timer != null) timer.cancel();
    }
}
