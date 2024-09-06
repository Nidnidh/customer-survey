import React from 'react';

const SurveyScreen = ({
  surveyData,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  updateAnswers,
  handleSurveySubmit,
  answers,
}) => {
  if (!surveyData || surveyData.length === 0) {
    return <div>Loading survey...</div>;
  }

  const currentQuestion = surveyData[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Error: Question not found</div>;
  }

  const handleAnswerChange = (e) => {
    updateAnswers(currentQuestion.id, e.target.value);
  };

  return (
    <div className="survey-container">
      <div className="survey-header">Customer Survey</div>
      <div className="survey-question">
        {currentQuestionIndex + 1}/{surveyData.length}
      </div>
      <p>{currentQuestion.text}</p>
      <div className="rating-options">
        {[1, 2, 3, 4, 5].map((number) => (
          <React.Fragment key={number}>
            <input
              type="radio"
              id={`option-${number}`}
              name="rating"
              value={number}
              checked={answers[currentQuestion.id] === String(number)}
              onChange={handleAnswerChange}
            />
            <label htmlFor={`option-${number}`}>{number}</label>
          </React.Fragment>
        ))}
      </div>
      <div className="survey-buttons">
        {currentQuestionIndex > 0 && (
          <button className="prev-button" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
            Prev
          </button>
        )}
        {currentQuestionIndex < surveyData.length - 1 ? (
          <button className="next-button" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
            Next
          </button>
        ) : (
          <button className="next-button" onClick={handleSurveySubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default SurveyScreen;
