document.addEventListener('DOMContentLoaded', function () {
  const tiles = document.querySelectorAll('.tile');
  const sentenceTilesContainer = document.querySelector('.sentence-tiles');
  const playButton = document.getElementById('play-sentence');
  const clearButton = document.getElementById('clear-sentence');

  let sentence = JSON.parse(localStorage.getItem('sentence') || '[]');
  renderSentenceBar();

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const word = tile.querySelector('span').innerText;
      const audioSrc = tile.getAttribute('data-audio');

      if (audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
      }

      // Add to sentence
      sentence.push({ word, audioSrc });
      localStorage.setItem('sentence', JSON.stringify(sentence));
      renderSentenceBar();
    });
  });

  playButton.addEventListener('click', async () => {
    for (const item of sentence) {
      if (item.audioSrc) {
        const audio = new Audio(item.audioSrc);
        await playAudio(audio);
      }
    }
  });

  clearButton.addEventListener('click', () => {
    sentence = [];
    localStorage.removeItem('sentence');
    renderSentenceBar();
  });

  function renderSentenceBar() {
    sentenceTilesContainer.innerHTML = '';
    sentence.forEach(item => {
      const tileElem = document.createElement('div');
      tileElem.classList.add('sentence-tile');
      tileElem.innerText = item.word;
      sentenceTilesContainer.appendChild(tileElem);
    });
  }

  function playAudio(audio) {
    return new Promise(resolve => {
      audio.play();
      audio.onended = resolve;
    });
  }
});
