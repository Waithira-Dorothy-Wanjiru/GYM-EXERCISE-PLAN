const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const exercisePlan = document.getElementById('exercise-plan');

const fetchExercises = async () => {
    exercisePlan.innerHTML = '';

    try {
        
        const response = await fetch('db.json');
        const jsonData = await response.json();

        daysOfWeek.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            const dayTitle = document.createElement('h2');
            dayTitle.textContent = day;
            dayDiv.appendChild(dayTitle);
            const exerciseList = document.createElement('ul');

            
            const isStretchingDay = day === "Saturday" || day === "Sunday";
            const exercisesToUse = isStretchingDay ? jsonData.stretchingExercises : jsonData.exercises;

            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * exercisesToUse.length);
                const exercise = exercisesToUse[randomIndex];

                const exerciseItem = document.createElement('li');
                exerciseItem.textContent = exercise.name; 
                const videoIframe = document.createElement('iframe');
                videoIframe.src = `https://www.youtube.com/embed/${exercise.videoId}`;
                videoIframe.allowFullscreen = true;
                videoIframe.width = "300"; 
                videoIframe.height = "200"; 
                exerciseItem.appendChild(videoIframe);

               
                const likeButton = document.createElement('button');
                likeButton.textContent = '👍 Like';
                const dislikeButton = document.createElement('button');
                dislikeButton.textContent = '👎 Dislike';
                const commentButton = document.createElement('button');
                commentButton.textContent = '💬 Comment';
                const commentSection = document.createElement('div');
                commentSection.classList.add('comment-section');

                const commentInput = document.createElement('input');
                commentInput.type = 'text';
                commentInput.placeholder = 'Add a comment...';
                const postCommentButton = document.createElement('button');
                postCommentButton.textContent = 'Post Comment';

                
                likeButton.addEventListener('click', () => alert(`You liked ${exercise.name}`));
                dislikeButton.addEventListener('click', () => alert(`You disliked ${exercise.name}`));
                commentButton.addEventListener('click', () => {
                    commentInput.style.display = 'inline';
                    postCommentButton.style.display = 'inline';
                });

                postCommentButton.addEventListener('click', () => {
                    const commentText = commentInput.value;
                    if (commentText) {
                        const comment = document.createElement('p');
                        comment.textContent = commentText;
                        commentSection.appendChild(comment);
                        commentInput.value = '';
                    } else {
                        alert('Please enter a comment.');
                    }
                });

                
                exerciseItem.appendChild(likeButton);
                exerciseItem.appendChild(dislikeButton);
                exerciseItem.appendChild(commentButton);
                exerciseItem.appendChild(commentInput);
                exerciseItem.appendChild(postCommentButton);
                exerciseItem.appendChild(commentSection);
                exerciseList.appendChild(exerciseItem);
            }

            dayDiv.appendChild(exerciseList);
            exercisePlan.appendChild(dayDiv);
        });
    } catch (error) {
        console.error('Error fetching exercises:', error);
    }
};

document.getElementById('fetch-exercises').addEventListener('click', fetchExercises);
