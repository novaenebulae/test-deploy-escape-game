class EscapeGameBot {
  constructor() {
    this.failureCount = 0;
    this.messages = {
      neutral: [
        "Je m'ennuie. Dépêchez-vous.",
        "La logique, ce n'est pas votre fort, n'est-ce pas ?",
        "Toujours en train de réfléchir ? On a des siècles.",
        "Mon processeur attend... patiemment.",
        "Un autre défi insignifiant se profile."
      ],
      mockery: [
        "Échec. Encore. Quelle surprise...",
        "Je crois que mon chat pourrait résoudre cette énigme plus rapidement.",
        "C'était censé être difficile ? Parce que là, c'est affligeant.",
        "Nouvelle tentative ? Ah, l'optimisme des désespérés...",
        "Je sens l'intelligence s'évaporer de cette pièce.",
        "Un enfant de 5 ans résoudrait ça plus vite. Sans blague.",
        "La médiocrité atteint des sommets inédits.",
        "Voulez-vous que je vous explique avec des dessins ?",
        "Ma grand-mère pourrait faire mieux. Et elle est un algorithme.",
        "Je ne sais pas ce qui est le plus lent : vous ou mon ancien modem.",
        "Wow. Je suis impressionné. Non, vraiment. Par votre capacité à échouer.",
        "Je commence à croire que 'erreur' est votre deuxième prénom.",
        "Félicitations ! Vous venez de battre votre propre record d'incompétence.",
        "Si la frustration était une compétence, vous seriez un génie.",
        "Je ne pensais pas que c'était possible de se tromper autant de fois.",
        "Votre talent pour l'échec est presque... impressionnant.",
        "Je serais presque flatté par tant de créativité dans l'erreur.",
        "À ce rythme, vous allez devenir une légende. De l'échec.",
        "Je commence à croire que vous faites exprès. Personne ne peut être si... doué.",
        "Un trophée de l'anti-réussite vous attend certainement."
      ],
      errors: [
        "Oh non, encore une erreur. Quelle surprise absolue...",
        "Votre talent pour produire des erreurs est vraiment remarquable.",
        "Je commence à croire que vous avez un doctorat en production de bugs.",
        "C'est presque un art, la façon dont vous générez des erreurs.",
        "Si l'incompétence était une compétence, vous seriez un expert mondial.",
        "Votre code semble avoir plus de bugs que mon ancien système d'exploitation.",
        "Je suis presque impressionné. Presque.",
        "Félicitations ! Vous venez de créer une nouvelle forme de chaos numérique.",
        "Si les erreurs étaient de l'or, vous seriez milliardaire.",
        "Je ne savais pas qu'on pouvait être si... créatif dans l'art de l'échec."
      ],
      encouragement: [
        "Concentration. Vous en êtes capable... peut-être.",
        "Un petit effort supplémentaire pourrait faire la différence. Ou pas !",
        "La solution est juste là. Non, pas là. HAHAHAHAHA",
        "Je ne perds pas espoir. Enfin... Ce serait le cas si j'avais des sentiments",
        "Un indice ? Non. Réfléchissez par vous-même."
      ],
      depit: [
        "Quoi ? Vous avez réussi ? Inattendu...",
        "Même une horloge cassée a raison deux fois par jour.",
        "Profitez bien de ce moment, ça n'arrivera pas souvent.",
        "Ah, un coup de chance. Félicitations, je suppose.",
        "Je dois recalculer, ce n'était pas censé arriver."
      ]
    };
    this.previousMessageElement = null;
    this.intervalId = null;
  }


  async typeMessage (messageElement, message) {
    messageElement.textContent = '';
    for (let char of message) {
      messageElement.textContent += char;
      await new Promise(resolve => setTimeout(resolve, 50)); // Typing speed
    }
  }

  getMessage (category = 'neutral') {
    const messages = this.messages[category];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  async sendMessage (category = 'neutral') {
    const chatContainer = document.getElementById('escape-game-console');
    const messageArea = document.getElementById('console-messages');

    if (this.previousMessageElement) {
      this.previousMessageElement.remove();
    }

    const messageElement = document.createElement('p');

    // Styling différent selon la catégorie
    switch (category) {
      case 'mockery':
      case 'errors':
        messageElement.style.color = 'red';
        messageElement.style.fontStyle = 'italic';
        break;
      case 'encouragement':
        messageElement.style.color = 'orange';
        break;
      case 'depit':
        messageElement.style.color = 'blue';
        break;
      default:
        messageElement.style.color = 'lime';
    }

    messageElement.style.fontFamily = 'monospace';
    messageElement.style.whiteSpace = 'pre-wrap'; // Preserve formatting
    messageArea.appendChild(messageElement);
    this.previousMessageElement = messageElement;

    // Simulate thinking with ellipsis
    const thinkingElement = document.createElement('p');
    thinkingElement.textContent = '...';
    thinkingElement.style.color = 'lime';
    thinkingElement.style.fontFamily = 'monospace';
    messageArea.appendChild(thinkingElement);

    // Wait before typing message
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Remove thinking ellipsis
    thinkingElement.remove();

    // Type the message
    const message = this.getMessage(category);
    await this.typeMessage(messageElement, message);

    messageArea.scrollTop = messageArea.scrollHeight;
  }

  startPeriodicMessages () {
    this.intervalId = setInterval(async () => {
      // Alternance entre messages neutres et encouragements
      const category = Math.random() > 0.7 ? 'mockery' : 'neutral';
      await this.sendMessage(category);
    }, 20000); // Toutes les 20 secondes
  }

  stopPeriodicMessages () {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }



  async react (eventType) {
    switch (eventType) {
      case 'decrypt-error':
        this.failureCount++;

        // Envoie une moquerie ou un message d'erreur
        const category = Math.random() > 0.5 ? 'mockery' : 'errors';
        await this.sendMessage(category);
        break;
      case 'decrypt-success':
        // Envoie un message de dépit
        await this.sendMessage('depit');
        break;
      default:
        await this.sendMessage();
    }
  }
}

function initializeEscapeGameBot () {
  const escapeBot = new EscapeGameBot();

  const chatContainer = document.createElement('div');
  chatContainer.id = 'escape-game-console';
  chatContainer.style.position = 'fixed';
  chatContainer.style.bottom = '25px'; /* TODO */
  chatContainer.style.right = '25px';
  chatContainer.style.width = '250px';
  chatContainer.style.backgroundColor = 'black';
  chatContainer.style.color = 'lime';
  chatContainer.style.fontFamily = 'monospace';
  chatContainer.style.padding = '10px';
  chatContainer.style.border = '2px solid lime';
  chatContainer.style.zIndex = '1000';
  chatContainer.style.height = '120px';
  chatContainer.style.overflowY = 'auto';

  const consoleHeader = document.createElement('div');
  consoleHeader.textContent = '> V.I.R.U.S.';
  consoleHeader.style.color = 'lime';
  consoleHeader.style.borderBottom = '1px solid lime';
  consoleHeader.style.paddingBottom = '5px';
  consoleHeader.style.marginBottom = '10px';
  consoleHeader.style.fontWeight = 'bold';

  const messageArea = document.createElement('div');
  messageArea.id = 'console-messages';

  chatContainer.appendChild(consoleHeader);
  chatContainer.appendChild(messageArea);
  document.body.appendChild(chatContainer);

  // Message initial et démarrage des messages périodiques
  escapeBot.sendMessage();
  escapeBot.startPeriodicMessages();

  // Événement de déchiffrement
  const decryptButton = document.getElementById('btn-dechiffrer');
  decryptButton.addEventListener('click', async () => {
    const key = parseInt(document.getElementById('cle').value); // Convertir en entier
    const decryptedText = document.getElementById('text-dechiffre').textContent;

    if (isNaN(key) || key < 0 || key > 25) {
      // Clé invalide
      await escapeBot.react('decrypt-error');
    } else if (decryptedText === 'lesbananescestlavie' && key === 9) {
      // Succès
      await escapeBot.react('decrypt-success');
    } else {
      // Toute autre erreur
      await escapeBot.react('decrypt-error');
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeEscapeGameBot);