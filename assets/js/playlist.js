(function () {
  const { renderPlaylistItem } = window.MediaFlowUI;

  function createPlaylistManager(config) {
    const {
      listElement,
      countElement,
      onSelect,
      onRemove
    } = config;

    listElement.addEventListener("click", function (event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const action = target.dataset.action;
      const index = Number(target.dataset.index);
      if (!Number.isInteger(index)) {
        return;
      }

      if (action === "play") {
        onSelect(index);
      }

      if (action === "remove") {
        onRemove(index);
      }
    });

    function render(playlist, activeIndex) {
      listElement.innerHTML = playlist
        .map(function (item, index) {
          return renderPlaylistItem(item, index, activeIndex);
        })
        .join("");

      countElement.textContent = `${playlist.length} item${playlist.length === 1 ? "" : "s"}`;
    }

    return { render };
  }

  window.MediaFlowPlaylist = {
    createPlaylistManager
  };
})();
