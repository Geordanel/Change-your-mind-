document.getElementById('experienceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    addExperience(title, content);
    document.getElementById('experienceForm').reset();
});

function addExperience(title, content) {
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
        </div>
    `;
    experiencesDiv.appendChild(experience);

    experience.querySelector('.commentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const comment = this.querySelector('input').value;
        addComment(this.parentElement, comment);
        this.reset();
    });
}

function addComment(experience, comment) {
    const commentsDiv = experience.querySelector('.comments');
    const newComment = document.createElement('p');
    newComment.textContent = comment;
    commentsDiv.appendChild(newComment);
}
