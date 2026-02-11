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
        { question: 'Empathy', answer: 'Empathie - capacité à comprendre les autres' }
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
        { question: 'Synthèse', answer: 'Résumé des points clés du débat' }
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
        { question: 'Git', answer: 'Système de contrôle de version' }
    ]
};

// Variables globales
let currentTheme = 'english';
let currentCards = [...flashcardsData[currentTheme]];
let currentIndex = 0;
let knownCards = 0;
let reviewCards = 0;

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

// Initialisation
function init() {
    loadCard();
    updateStats();
    updateNavigationButtons();
}

// Charger une carte
function loadCard() {
    if (currentCards.length === 0) {
        questionEl.textContent = '🎉 Toutes les cartes sont terminées !';
        answerEl.textContent = 'Clique sur Recommencer pour réviser';
        return;
    }
    
    const card = currentCards[currentIndex];
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;
    
    // Retourner la carte sur le recto
    flashcard.classList.remove('flipped');
}

// Retourner la carte
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
});

// Changer de thème
themeSelector.addEventListener('change', (e) => {
    currentTheme = e.target.value;
    resetGame();
});

// Navigation
btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadCard();
        updateStats();
        updateNavigationButtons();
    }
});

btnNext.addEventListener('click', () => {
    if (currentIndex < currentCards.length - 1) {
        currentIndex++;
        loadCard();
        updateStats();
        updateNavigationButtons();
    }
});

// Bouton "Je sais"
btnKnow.addEventListener('click', () => {
    knownCards++;
    removeCurrentCard();
});

// Bouton "À revoir"
btnReview.addEventListener('click', () => {
    reviewCards++;
    removeCurrentCard();
});

// Retirer la carte actuelle et passer à la suivante
function removeCurrentCard() {
    currentCards.splice(currentIndex, 1);
    
    // Ajuster l'index si nécessaire
    if (currentIndex >= currentCards.length && currentIndex > 0) {
        currentIndex--;
    }
    
    loadCard();
    updateStats();
    updateNavigationButtons();
}

// Mettre à jour les statistiques
function updateStats() {
    currentCardEl.textContent = currentCards.length > 0 ? currentIndex + 1 : 0;
    totalCardsEl.textContent = currentCards.length;
    knownCountEl.textContent = knownCards;
    reviewCountEl.textContent = reviewCards;
}

// Mettre à jour les boutons de navigation
function updateNavigationButtons() {
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === currentCards.length - 1 || currentCards.length === 0;
}

// Recommencer le jeu
btnReset.addEventListener('click', resetGame);

function resetGame() {
    currentCards = [...flashcardsData[currentTheme]];
    currentIndex = 0;
    knownCards = 0;
    reviewCards = 0;
    loadCard();
    updateStats();
    updateNavigationButtons();
}

// Lancer l'application
init();