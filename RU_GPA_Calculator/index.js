calculateBtn = document.getElementById('calculate-button');
// index.js

document.addEventListener('DOMContentLoaded', () => {
    const addClassButton = document.getElementById('add-class');
    const classGradePairsContainer = document.getElementById('class-grade-pairs');
    const calculateButton = document.getElementById('calculate-button');
    const resultsBody = document.getElementById('results-body');
    const totalCreditsTd = document.getElementById('total-credits');
    const totalPointsTd = document.getElementById('total-points');
    const resultDiv = document.getElementById('result');

    addClassButton.addEventListener('click', () => {
        const pairCount = classGradePairsContainer.getElementsByClassName('pair').length + 1;

        const pairDiv = document.createElement('div');
        pairDiv.className = 'pair';

        const classInput = document.createElement('input');
        classInput.type = 'text';
        classInput.className = 'class-input';
        classInput.placeholder = `Class ${pairCount} Name`;

        const creditInput = document.createElement('input');
        creditInput.type = 'number';
        creditInput.className = 'credit-input';
        creditInput.placeholder = `Class ${pairCount} Credits`;
        creditInput.min = 0;
        creditInput.step = 1;

        const gradeInput = document.createElement('input');
        gradeInput.type = 'text';
        gradeInput.className = 'grade-input';
        gradeInput.placeholder = `Class ${pairCount} Grade (e.g., A, B+, C-)`;

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'remove-class';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            classGradePairsContainer.removeChild(pairDiv);
            updatePlaceholders();
        });

        pairDiv.appendChild(classInput);
        pairDiv.appendChild(creditInput);
        pairDiv.appendChild(gradeInput);
        pairDiv.appendChild(removeButton);

        classGradePairsContainer.appendChild(pairDiv);
    });

    function updatePlaceholders() {
        const pairs = classGradePairsContainer.getElementsByClassName('pair');
        for (let i = 0; i < pairs.length; i++) {
            const classInput = pairs[i].getElementsByClassName('class-input')[0];
            const creditInput = pairs[i].getElementsByClassName('credit-input')[0];
            const gradeInput = pairs[i].getElementsByClassName('grade-input')[0];

            classInput.placeholder = `Class ${i + 1} Name`;
            creditInput.placeholder = `Class ${i + 1} Credits`;
            gradeInput.placeholder = `Class ${i + 1} Grade (e.g., A, B+, C-)`;
        }
    }

    calculateButton.addEventListener('click', () => {
        const gpaInput = document.getElementById('gpa').value.trim();
        const creditsInput = document.getElementById('credits').value.trim();

        if (gpaInput === '' || creditsInput === '') {
            alert('Please enter both your current GPA and total credits.');
            return;
        }

        const currentGPA = parseFloat(gpaInput);
        const currentCredits = parseFloat(creditsInput);

        if (isNaN(currentGPA) || isNaN(currentCredits)) {
            alert('Please enter valid numbers for GPA and credits.');
            return;
        }

        if (currentGPA < 0 || currentCredits < 0) {
            alert('GPA and credits cannot be negative.');
            return;
        }

        const pairs = classGradePairsContainer.getElementsByClassName('pair');

        if (pairs.length === 0) {
            alert('Please add at least one class to calculate GPA.');
            return;
        }

        let totalNewCredits = 0;
        let totalNewPoints = 0;
        resultsBody.innerHTML = '';

        for (let i = 0; i < pairs.length; i++) {
            const classInput = pairs[i].getElementsByClassName('class-input')[0];
            const creditInput = pairs[i].getElementsByClassName('credit-input')[0];
            const gradeInput = pairs[i].getElementsByClassName('grade-input')[0];

            const className = classInput.value.trim();
            const classCredits = parseFloat(creditInput.value.trim());
            const grade = gradeInput.value.trim().toUpperCase();

            if (className === '') {
                alert(`Please enter the name for Class ${i + 1}.`);
                return;
            }

            if (isNaN(classCredits) || classCredits <= 0) {
                alert(`Please enter a valid number of credits for ${className}.`);
                return;
            }

            if (grade === '') {
                alert(`Please enter a grade for ${className}.`);
                return;
            }

            const gradePoint = getGradePoint(grade);
            if (gradePoint === null) {
                alert(`Invalid grade "${grade}" for ${className}. Please enter a valid grade (e.g., A, B+, C-).`);
                return;
            }

            const points = gradePoint * classCredits;
            totalNewCredits += classCredits;
            totalNewPoints += points;

            const row = document.createElement('tr');

            const gradeTd = document.createElement('td');
            gradeTd.textContent = grade;

            const gradeValueTd = document.createElement('td');
            gradeValueTd.textContent = gradePoint.toFixed(1);

            const creditsTd = document.createElement('td');
            creditsTd.textContent = `${classCredits}`;

            const pointsTd = document.createElement('td');
            pointsTd.textContent = `${points.toFixed(1)}`;

            row.appendChild(gradeTd);
            row.appendChild(gradeValueTd);
            row.appendChild(creditsTd);
            row.appendChild(pointsTd);

            resultsBody.appendChild(row);
        }

        const totalCredits = currentCredits + totalNewCredits;
        const totalPoints = (currentGPA * currentCredits) + totalNewPoints;
        const newGPA = (totalPoints / totalCredits).toFixed(2);

        totalCreditsTd.textContent = `${totalCredits}cr`;
        totalPointsTd.textContent = `${totalPoints.toFixed(1)}pts`;
        resultDiv.textContent = `Your new GPA is ${newGPA}`;
    });

    function getGradePoint(grade) {
        const gradePoints = {
            'A+': 4.0,
            'A': 4.0,
            'A-': 3.7,
            'B+': 3.3,
            'B': 3.0,
            'B-': 2.7,
            'C+': 2.3,
            'C': 2.0,
            'C-': 1.7,
            'D+': 1.3,
            'D': 1.0,
            'F': 0.0
        };

        return gradePoints.hasOwnProperty(grade) ? gradePoints[grade] : null;
    }
});
