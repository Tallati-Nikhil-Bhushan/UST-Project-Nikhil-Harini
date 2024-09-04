package com.example.capstone.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "gad7_responses")
public class Gad7Response {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "user_id")
        private Long userId;

        private int question1;
        private int question2;
        private int question3;
        private int question4;
        private int question5;
        private int question6;
        private int question7;
        
        public Gad7Response() {
			// TODO Auto-generated constructor stub
		}
        
		public Gad7Response(Long id, Long userId, int question1, int question2, int question3, int question4,
				int question5, int question6, int question7) {
			super();
			this.id = id;
			this.userId = userId;
			this.question1 = question1;
			this.question2 = question2;
			this.question3 = question3;
			this.question4 = question4;
			this.question5 = question5;
			this.question6 = question6;
			this.question7 = question7;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public int getQuestion1() {
			return question1;
		}

		public void setQuestion1(int question1) {
			this.question1 = question1;
		}

		public int getQuestion2() {
			return question2;
		}

		public void setQuestion2(int question2) {
			this.question2 = question2;
		}

		public int getQuestion3() {
			return question3;
		}

		public void setQuestion3(int question3) {
			this.question3 = question3;
		}

		public int getQuestion4() {
			return question4;
		}

		public void setQuestion4(int question4) {
			this.question4 = question4;
		}

		public int getQuestion5() {
			return question5;
		}

		public void setQuestion5(int question5) {
			this.question5 = question5;
		}

		public int getQuestion6() {
			return question6;
		}

		public void setQuestion6(int question6) {
			this.question6 = question6;
		}

		public int getQuestion7() {
			return question7;
		}

		public void setQuestion7(int question7) {
			this.question7 = question7;
		}
        
        
}
