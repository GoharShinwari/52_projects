document.addEventListener('DOMContentLoaded', () => {
    const addClassButton = document.getElementById('add-class');
    const classGradePairsContainer = document.getElementById('class-grade-pairs');
    const calculateButton = document.getElementById('calculate-button');
    const resultsBody = document.getElementById('results-body');
    const totalCreditsSpan = document.getElementById('total-credits');
    const resultSpan = document.getElementById('result'); 

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
        gradeInput.placeholder = `Class ${pairCount} Grade (e.g., A, B+, C)`;

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
            gradeInput.placeholder = `Class ${i + 1} Grade (e.g., A, B+, C)`;
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

        for (let i = 0; i < pairs.length; i++) {
            const classInput = pairs[i].getElementsByClassName('class-input')[0];
            const creditInput = pairs[i].getElementsByClassName('credit-input')[0];
            const gradeInput = pairs[i].getElementsByClassName('grade-input')[0];

            const classCredits = parseFloat(creditInput.value.trim());
            const grade = gradeInput.value.trim().toUpperCase();

            const gradePoint = getGradePoint(grade);
            if (gradePoint === null) {
                alert(`Invalid grade "${grade}". Please enter a valid grade (e.g., A, B+, C).`);
                return;
            }

            const points = gradePoint * classCredits;
            totalNewCredits += classCredits;
            totalNewPoints += points;
        }

        const totalCredits = currentCredits + totalNewCredits;
        const totalPoints = (currentGPA * currentCredits) + totalNewPoints;
        const newGPA = (totalPoints / totalCredits).toFixed(2);

        totalCreditsSpan.textContent = `${totalCredits}`;
        resultSpan.textContent = `${newGPA}`;
    });

    function getGradePoint(grade) {
        const gradePoints = {
            'A': 4.0,
            'B+': 3.5,
            'B': 3.0,
            'C+': 2.5,
            'C': 2.0,
            'D': 1.0,
            'F': 0.0
        };

        return gradePoints.hasOwnProperty(grade) ? gradePoints[grade] : null;
    }
});
