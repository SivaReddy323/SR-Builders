const consultationModal = document.getElementById('consultation-modal');
const consultationOpenButton = document.getElementById('open-consultation-form');
const consultationForm = document.getElementById('consultation-form');

if (consultationModal && consultationOpenButton && consultationForm) {
  const consultationCloseTargets = consultationModal.querySelectorAll('[data-close-consultation]');
  const consultationFirstField = consultationForm.querySelector('input');

  const setConsultationOpenState = (open) => {
    consultationModal.classList.toggle('is-open', open);
    consultationModal.setAttribute('aria-hidden', open ? 'false' : 'true');
    consultationOpenButton.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (open && consultationFirstField) {
      consultationFirstField.focus();
    }
  };

  consultationOpenButton.addEventListener('click', () => {
    setConsultationOpenState(true);
  });

  consultationCloseTargets.forEach((closeTarget) => {
    closeTarget.addEventListener('click', () => {
      setConsultationOpenState(false);
    });
  });

  consultationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    consultationForm.reset();
    setConsultationOpenState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && consultationModal.classList.contains('is-open')) {
      setConsultationOpenState(false);
    }
  });
}