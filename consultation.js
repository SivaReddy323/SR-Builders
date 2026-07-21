const openConsultationButton = document.getElementById('open-consultation-form');
const consultationModal = document.getElementById('consultation-modal');
const consultationForm = document.getElementById('consultation-form');
const consultationWhatsappNumber = '919553688562';

if (openConsultationButton && consultationModal && consultationForm) {
  const closeConsultationModal = () => {
    consultationModal.classList.remove('is-open');
    consultationModal.setAttribute('aria-hidden', 'true');
  };

  const openConsultationModal = () => {
    consultationModal.classList.add('is-open');
    consultationModal.setAttribute('aria-hidden', 'false');
    const firstField = consultationForm.querySelector('input');
    if (firstField) {
      firstField.focus();
    }
  };

  openConsultationButton.addEventListener('click', openConsultationModal);

  consultationModal.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-close-consultation')) {
      closeConsultationModal();
    }
  });

  consultationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(consultationForm);
    const consultationEntry = {
      name: String(formData.get('first-name') || '').trim(),
      surname: String(formData.get('surname') || '').trim(),
      phoneNumber: String(formData.get('phone-number') || '').trim(),
      mail: String(formData.get('mail') || '').trim(),
    };

    const whatsappMessage = [
      'New consultation request from SK Builders website:',
      `Name: ${consultationEntry.name}`,
      `Surname: ${consultationEntry.surname}`,
      `Phone Number: ${consultationEntry.phoneNumber}`,
      `Email: ${consultationEntry.mail}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${consultationWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.location.href = whatsappUrl;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && consultationModal.classList.contains('is-open')) {
      closeConsultationModal();
    }
  });
}
