document.addEventListener('DOMContentLoaded', function() {
    loadExperiences();
});

document.getElementById('experienceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    saveExperience(title, content);
    addExperience(title, content);
    document.getElementById('experienceForm').reset();
});

function saveExperience(title, content) {
    const experiences = getExperiences();
    experiences.push({ title, content, comments: [] });
    localStorage.setItem('experiences', JSON.stringify(experiences));
}

function getExperiences() {
    const experiences = localStorage.getItem('experiences');
    return experiences ? JSON.parse(experiences) : [];
}

function loadExperiences() {
    const experiences = getExperiences();
    experiences.forEach(exp => {
        addExperience(exp.title, exp.content, exp.comments);
    });
}

function addExperience(title, content, comments = []) {
    const experiencesDiv = document.getElementById('experiences');
    const experience = document.createElement('div');
    experience.classList.add('experience');
    experience.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="comments">
            <h4>Commentaires :</h4>
            <form class="commentForm">
                <input type="text" placeholder="Votre commentaire">
                <button type="submit">Envoyer</button>
            </form>
            ${comments.map(comment => `<p>${comment}</p>`).join('')}
        </div>
    `;
    experiencesDiv.appendChild(experience);

    experience.querySelector('.commentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const comment = this.querySelector('input').value;
        saveComment(title, comment);
        addComment(this.parentElement, comment);
        this.reset();
    });
}

function saveComment(title, comment) {
    const experiences = getExperiences();
    const experience = experiences.find(exp => exp.title === title);
    if (experience) {
        experience.comments.push(comment);
        localStorage.setItem('experiences', JSON.stringify(experiences));
    }
}

function addComment(experience, comment) {
    const commentsDiv = experience.querySelector('.comments');
    const newComment = document.createElement('p');
    newComment.textContent = comment;
    commentsDiv.appendChild(newComment);
}
