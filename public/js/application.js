const cancel = document.getElementById('cancel');

cancel.onclick = () => {
  if (confirm('Подтвердить')) {
    return true;
  }
  return false;
};
