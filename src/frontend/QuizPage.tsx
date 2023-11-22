import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '/Users/rohansonthalia/Documents/AIvisor/src/frontend/LoginPage.css';


interface InputCategories {
  [key: string]: string[];
}

const QuizPage = () => {
  const navigate = useNavigate();
  const inputs: InputCategories = {
    Biographical: ["Ethnicity", "Gender", "Age", "Demographic", "Annual Family Income", "Will be requiring aid, (Y/N)"],
    Personality: ["How would you describe yourself in one word", "On a scale of one to ten, how much would you say you are a social person", "On a scale of one to ten, how confident do you think you are in dealing with high levels of stress and performance pressure", "In a sentence or two, how would you describe your ideal college experience. (Don't stress! Not an essay)", "What do you think constitutes as fun?", "The Greatest Weekend Plan is: "],
    AcademicCurrentStanding: ["Current GPA", "GPA trajectory, last n-8 years", "SAT/ACT scores", "Any APs taken whatsoever", "Academic Competitions Won/Participated in", "Any Research that you were a part of", "Did you start any companies/organizations?", "What about extra curricular, what did you do besides academics?", "What's something fun that you have done that has had an impact on other people?", "What about your leadership experiences?", "Anything missing?"]
  };

  const [answers, setAnswers] = useState<{ [key: string]: { [key: string]: any } }>({
    Biographical: {},
    Personality: {},
    AcademicCurrentStanding: {},
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You can add any initialization or fetch operations here if needed.
    setLoading(false); // Setting loading to false after the operations are done.
  }, []);

  const handleInputChange = (
    category: string,
    question: string,
    value: any
  ) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [category]: {
        ...prevAnswers[category],
        [question]: value,
      },
    }));
  };

  const [activeCategory, setActiveCategory] = useState<string | null>(null);


  const handleToggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null); // If the clicked category is already active, collapse it
    } else {
      setActiveCategory(category); // Otherwise, set the clicked category as active (expand it)
    }
  };
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Setting loading to true when starting the submit operation.
    try {
      const response = await axios.post('http://0.0.0.0:8080/form1', answers, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('Data sent successfully:', response.data);
        navigate('/result');
      } else {
        console.log('Server returned a non-200 status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false); // Setting loading to false after the submit operation is done.
  };

  return (
    <div className={'container'}>
      <h1 className={'quizTitle'}>Quiz</h1>
      <form onSubmit={handleSubmit} className={'formContainer'}>
        {Object.keys(inputs).map((category) => (
          <div key={category} className={'collapsibleContainer'}>
            <div
              className={'collapsibleHeader'}
              onClick={() => handleToggleCategory(category)}
            >
              <h2 className={'categoryTitle'}>{category}</h2>
            </div>
            {activeCategory === category && (
              <div className={'collapsibleContent'}>
                {inputs[category].map((question: string) => (
                  <div key={question}>
                    <label className={'questionLabel'}>{question}</label>
                    <input
                      type="text"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(category, question, e.target.value)}
                      className={'inputField'}
                      value={answers[category][question] || ''}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button type="submit" className={'submitButton'}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default QuizPage;
