// Base de données des flashcards par thème
const flashcardsData = {
    english: [
        { question: 'Ambitious', answer: 'Ambitieux - qui a de grandes aspirations' },
        { question: 'Achievement', answer: 'Réalisation - accomplissement d\'un objectif' },
        { question: 'Resilient', answer: 'Résilient - capacité à surmonter les difficultés' },
        { question: 'Innovative', answer: 'Innovant - qui apporte de nouvelles idées' },
        { question: 'Collaborate', answer: 'Collaborer - travailler ensemble' },
        { question: 'Perseverance', answer: 'Persévérance - persistance dans l\'effort' },
        { question: 'Eloquent', answer: 'Éloquent - qui s\'exprime avec aisance' },
        { question: 'Integrity', answer: 'Intégrité - honnêteté et droiture morale' },
        { question: 'Versatile', answer: 'Polyvalent - capable de s\'adapter' },
        { question: 'Empathy', answer: 'Empathie - capacité à comprendre les autres' },
        { question: 'Diligent', answer: 'Diligent - travailleur et consciencieux' },
        { question: 'Pragmatic', answer: 'Pragmatique - orienté vers des solutions pratiques' },
        { question: 'Assertive', answer: 'Assuré - qui s\'affirme avec confiance' },
        { question: 'Meticulous', answer: 'Méticuleux - attentif aux détails' },
        { question: 'Articulate', answer: 'Articulé - qui s\'exprime clairement' }
    ],
    debate: [
        { question: 'Argument principal', answer: 'Thèse centrale soutenue avec des preuves' },
        { question: 'Contre-argument', answer: 'Argument qui s\'oppose à la thèse' },
        { question: 'Exemple concret', answer: 'Illustration réelle pour appuyer un point' },
        { question: 'Statistique', answer: 'Donnée chiffrée pour renforcer l\'argumentation' },
        { question: 'Transition', answer: 'Lien logique entre deux idées' },
        { question: 'Réfutation', answer: 'Démontrer la faiblesse d\'un argument adverse' },
        { question: 'Analogie', answer: 'Comparaison pour clarifier une idée complexe' },
        { question: 'Citation d\'expert', answer: 'Référence à une autorité reconnue' },
        { question: 'Concession', answer: 'Reconnaître un point valide de l\'adversaire' },
        { question: 'Synthèse', answer: 'Résumé des points clés du débat' },
        { question: 'Sophisme', answer: 'Raisonnement fallacieux qui semble logique' },
        { question: 'Prémisse', answer: 'Proposition de base d\'un raisonnement' },
        { question: 'Déduction', answer: 'Conclusion tirée de prémisses logiques' },
        { question: 'Rhétorique', answer: 'Art de bien parler et convaincre' },
        { question: 'Dialectique', answer: 'Méthode de discussion par questions-réponses' }
    ],
    tech: [
        { question: 'API', answer: 'Application Programming Interface - interface de programmation' },
        { question: 'DOM', answer: 'Document Object Model - structure HTML manipulable' },
        { question: 'Responsive', answer: 'Design adaptatif aux différentes tailles d\'écran' },
        { question: 'Framework', answer: 'Structure de base pour développer une application' },
        { question: 'Bug', answer: 'Erreur dans le code informatique' },
        { question: 'Déploiement', answer: 'Mise en ligne d\'une application' },
        { question: 'Variable', answer: 'Conteneur pour stocker des données' },
        { question: 'Fonction', answer: 'Bloc de code réutilisable' },
        { question: 'Async', answer: 'Exécution asynchrone - non bloquante' },
        { question: 'Git', answer: 'Système de contrôle de version' },
        { question: 'JSON', answer: 'JavaScript Object Notation - format de données' },
        { question: 'Callback', answer: 'Fonction passée en paramètre d\'une autre fonction' },
        { question: 'Promise', answer: 'Objet représentant une opération asynchrone' },
        { question: 'Array', answer: 'Tableau - liste ordonnée d\'éléments' },
        { question: 'Loop', answer: 'Boucle - répétition d\'instructions' }
    ],
    science: [
        { question: 'Photosynthèse', answer: 'Processus de conversion de lumière en énergie' },
        { question: 'Mitochondrie', answer: 'Organite producteur d\'énergie cellulaire' },
        { question: 'Écosystème', answer: 'Ensemble des êtres vivants et leur environnement' },
        { question: 'Évolution', answer: 'Transformation des espèces au fil du temps' },
        { question: 'Molécule', answer: 'Assemblage d\'atomes liés chimiquement' },
        { question: 'Gravité', answer: 'Force d\'attraction entre deux corps' },
        { question: 'Photon', answer: 'Particule de lumière sans masse' },
        { question: 'Enzyme', answer: 'Protéine catalysant des réactions chimiques' },
        { question: 'Neurone', answer: 'Cellule nerveuse transmettant l\'information' },
        { question: 'ADN', answer: 'Acide désoxyribonucléique - support de l\'information génétique' }
    ],
    history: [
        { question: 'Renaissance', answer: 'Période de renouveau culturel (14e-17e siècle)' },
        { question: 'Révolution française', answer: 'Bouleversement politique de 1789' },
        { question: 'Guerre froide', answer: 'Tension USA-URSS (1947-1991)' },
        { question: 'Siècle des Lumières', answer: 'Mouvement intellectuel du 18e siècle' },
        { question: 'Démocratie', answer: 'Pouvoir du peuple par le peuple' },
        { question: 'Colonisation', answer: 'Domination d\'un territoire par un État' },
        { question: 'Mondialisation', answer: 'Interconnexion croissante des économies' },
        { question: 'Absolutisme', answer: 'Pouvoir royal sans limites' },
        { question: 'Industrialisation', answer: 'Développement massif de l\'industrie' },
        { question: 'Suffrage universel', answer: 'Droit de vote pour tous les citoyens' }
    ]
};

// Variables globales
let currentTheme = 'english';
let currentCards = [];
let currentIndex = 0;
let knownCards = 0;
let reviewCards = 0;
let quizMode = false;
let quizScore = 0;
let quizTotal = 0;

// Sons (création de sons simples avec Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
        oscillator.frequency.value = 523.25;
        oscillator.type = 'sine';
    } else if (type === 'flip') {
        oscillator.frequency.value = 440;
        oscillator.type = 'sine';
    } else if (type === 'wrong') {
        oscillator.frequency.value = 200;
        oscillator.type = 'square';
    } else if (type === 'complete') {
        oscillator.frequency.value = 659.25;
        oscillator.type = 'sine';
    }
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Éléments du DOM
const flashcard = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const currentCardEl = document.getElementById('current-card');
const totalCardsEl = document.getElementById('total-cards');
const knownCountEl = document.getElementById('known-count');
const reviewCountEl = document.getElementById('review-count');
const themeSelector = document.getElementById('theme');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnKnow = document.getElementById('btn-know');
const btnReview = document.getElementById('btn-review');
const btnReset = document.getElementById('btn-reset');
const btnQuizMode = document.getElementById('btn-quiz-mode');
const btnShuffle = document.getElementById('btn-shuffle');
const scoreEl = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const hintEl = document.getElementById('hint');
const normalControls = document.getElementById('normal-controls');
const quizOptions = document.getElementById('quiz-options');

// LocalStorage - Chargement des progrès sauvegardés
function loadProgress() {
    const savedProgress = localStorage.getItem('flashcards-progress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        knownCards = progress.knownCards || 0;
        reviewCards = progress.reviewCards || 0;
        currentTheme = progress.currentTheme || 'english';
        themeSelector.value = currentTheme;
        console.log('✅ Progrès chargés');
    }
}

// LocalStorage - Sauvegarde des progrès
function saveProgress() {
    const progress = {
        knownCards: knownCards,
        reviewCards: reviewCards,
        currentTheme: currentTheme,
        lastUpdate: new Date().toISOString()
    };
    localStorage.setItem('flashcards-progress', JSON.stringify(progress));
}

// Initialisation
function init() {
    loadProgress();
    currentCards = [...flashcardsData[currentTheme]];
    loadCard();
    updateStats();
    updateNavigationButtons();
    updateProgressBar();
}

// Charger une carte (mode normal)
function loadCard() {
    if (currentCards.length === 0) {
        questionEl.textContent = '🎉 Toutes les cartes sont terminées !';
        answerEl.textContent = 'Clique sur Recommencer pour réviser';
        return;
    }
    
    const card = currentCards[currentIndex];
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;
    
    flashcard.classList.remove('flipped');
    flashcard.style.animation = 'slideIn 0.3s ease-out';
    setTimeout(() => {
        flashcard.style.animation = '';
    }, 300);
}

// Charger une question de quiz
function loadQuizQuestion() {
    if (currentCards.length === 0) {
        questionEl.textContent = '🎉 Quiz terminé !';
        answerEl.textContent = `Score final : ${quizScore}/${quizTotal} (${Math.round((quizScore/quizTotal)*100)}%)`;
        quizOptions.style.display = 'none';
        playSound('complete');
        return;
    }
    
    const card = currentCards[currentIndex];
    questionEl.textContent = card.question;
    answerEl.textContent = '';
    
    flashcard.classList.remove('flipped');
    
    generateQuizOptions(card);
}

// Générer les options de réponse
function generateQuizOptions(correctCard) {
    const allCards = flashcardsData[currentTheme];
    const options = [correctCard.answer];
    
    while (options.length < 4) {
        const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
        if (!options.includes(randomCard.answer)) {
            options.push(randomCard.answer);
        }
    }
    
    // Mélanger (Fisher-Yates)
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    displayQuizOptions(options, correctCard.answer);
}

// Afficher les options
function displayQuizOptions(options, correctAnswer) {
    quizOptions.innerHTML = '';
    
    options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        
        button.addEventListener('click', () => {
            checkQuizAnswer(option, correctAnswer, button);
        });
        
        quizOptions.appendChild(button);
    });
}

// Vérifier la réponse
function checkQuizAnswer(selectedAnswer, correctAnswer, button) {
    quizTotal++;
    
    const allButtons = document.querySelectorAll('.quiz-option');
    allButtons.forEach(btn => btn.disabled = true);
    
    if (selectedAnswer === correctAnswer) {
        quizScore++;
        button.classList.add('correct');
        playSound('correct');
        flashcard.style.animation = 'pulse 0.5s ease';
    } else {
        button.classList.add('wrong');
        playSound('wrong');
        
        allButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        flashcard.style.animation = 'shake 0.5s ease';
    }
    
    updateQuizStats();
    
    setTimeout(() => {
        flashcard.style.animation = '';
        currentCards.splice(currentIndex, 1);
        
        if (currentIndex >= currentCards.length && currentIndex > 0) {
            currentIndex--;
        }
        
        loadQuizQuestion();
        updateProgressBar();
    }, 2000);
}

// Mettre à jour les stats du quiz
function updateQuizStats() {
    scoreEl.textContent = `${quizScore}/${quizTotal}`;
    currentCardEl.textContent = quizTotal + 1;
    totalCardsEl.textContent = quizTotal + currentCards.length;
}

// Retourner la carte
flashcard.addEventListener('click', () => {
    if (!quizMode) {
        flashcard.classList.toggle('flipped');
        playSound('flip');
    }
});

// Changer de thème
themeSelector.addEventListener('change', (e) => {
    currentTheme = e.target.value;
    saveProgress();
    resetGame();
});

// Navigation
btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        if (quizMode) {
            loadQuizQuestion();
        } else {
            loadCard();
        }
        updateStats();
        updateNavigationButtons();
    }
});

btnNext.addEventListener('click', () => {
    if (currentIndex < currentCards.length - 1) {
        currentIndex++;
        if (quizMode) {
            loadQuizQuestion();
        } else {
            loadCard();
        }
        updateStats();
        updateNavigationButtons();
    }
});

// Bouton "Je sais"
btnKnow.addEventListener('click', () => {
    knownCards++;
    playSound('correct');
    saveProgress();
    removeCurrentCard();
    flashcard.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
        flashcard.style.animation = '';
    }, 300);
});

// Bouton "À revoir"
btnReview.addEventListener('click', () => {
    reviewCards++;
    playSound('wrong');
    saveProgress();
    removeCurrentCard();
    flashcard.style.animation = 'slideOutLeft 0.3s ease-out';
    setTimeout(() => {
        flashcard.style.animation = '';
    }, 300);
});

// Mode Quiz
btnQuizMode.addEventListener('click', () => {
    quizMode = !quizMode;
    
    if (quizMode) {
        quizScore = 0;
        quizTotal = 0;
        shuffleCards();
        btnQuizMode.textContent = '📚 Mode Flashcards';
        btnQuizMode.style.background = '#17a2b8';
        normalControls.style.display = 'none';
        quizOptions.style.display = 'grid';
        hintEl.textContent = '🎯 Choisis la bonne réponse parmi les 4 options';
        btnPrev.disabled = true;
        btnNext.disabled = true;
        loadQuizQuestion();
    } else {
        btnQuizMode.textContent = '🎲 Mode Quiz';
        btnQuizMode.style.background = '#6c757d';
        normalControls.style.display = 'flex';
        quizOptions.style.display = 'none';
        hintEl.textContent = '💡 Clique sur la carte pour voir la réponse (ou appuie sur Espace)';
        currentCards = [...flashcardsData[currentTheme]];
        currentIndex = 0;
        loadCard();
        updateNavigationButtons();
    }
    
    updateStats();
    updateProgressBar();
});

// Bouton Mélanger
btnShuffle.addEventListener('click', () => {
    shuffleCards();
    playSound('flip');
});

// Fonction pour mélanger les cartes
function shuffleCards() {
    const shuffled = [...flashcardsData[currentTheme]];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    currentCards = shuffled;
    currentIndex = 0;
    if (quizMode) {
        loadQuizQuestion();
    } else {
        loadCard();
    }
    updateStats();
    updateNavigationButtons();
}

// Retirer la carte actuelle
function removeCurrentCard() {
    currentCards.splice(currentIndex, 1);
    
    if (currentIndex >= currentCards.length && currentIndex > 0) {
        currentIndex--;
    }
    
    loadCard();
    updateStats();
    updateNavigationButtons();
    updateProgressBar();
}

// Mettre à jour les statistiques
function updateStats() {
    currentCardEl.textContent = currentCards.length > 0 ? currentIndex + 1 : 0;
    totalCardsEl.textContent = currentCards.length;
    knownCountEl.textContent = knownCards;
    reviewCountEl.textContent = reviewCards;
    
    if (!quizMode) {
        const totalAnswered = knownCards + reviewCards;
        if (totalAnswered > 0) {
            const percentage = Math.round((knownCards / totalAnswered) * 100);
            scoreEl.textContent = percentage + '%';
        } else {
            scoreEl.textContent = '0%';
        }
    }
}

// Barre de progression
function updateProgressBar() {
    const totalCards = flashcardsData[currentTheme].length;
    const cardsCompleted = totalCards - currentCards.length;
    const percentage = (cardsCompleted / totalCards) * 100;
    progressBar.style.width = percentage + '%';
}

// Mettre à jour les boutons de navigation
function updateNavigationButtons() {
    if (!quizMode) {
        btnPrev.disabled = currentIndex === 0;
        btnNext.disabled = currentIndex === currentCards.length - 1 || currentCards.length === 0;
    }
}

// Recommencer le jeu
btnReset.addEventListener('click', resetGame);

function resetGame() {
    currentCards = [...flashcardsData[currentTheme]];
    currentIndex = 0;
    
    if (quizMode) {
        quizScore = 0;
        quizTotal = 0;
        loadQuizQuestion();
    } else {
        knownCards = 0;
        reviewCards = 0;
        loadCard();
    }
    
    saveProgress();
    updateStats();
    updateNavigationButtons();
    updateProgressBar();
}

// Raccourcis clavier
document.addEventListener('keydown', (e) => {
    if (quizMode) return;
    
    if (e.key === 'ArrowLeft' && !btnPrev.disabled) {
        btnPrev.click();
    } else if (e.key === 'ArrowRight' && !btnNext.disabled) {
        btnNext.click();
    } else if (e.key === ' ') {
        e.preventDefault();
        flashcard.click();
    } else if (e.key === '1') {
        btnKnow.click();
    } else if (e.key === '2') {
        btnReview.click();
    }
});

// Lancer l'application
init();