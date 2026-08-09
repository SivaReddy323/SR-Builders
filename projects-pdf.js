(function () {
  const downloadButton = document.getElementById('download-projects-pdf');

  function extractField(lines, label) {
    const match = lines.find((line) => line.startsWith(label));
    if (!match) return 'N/A';
    return match.replace(label, '').trim();
  }

  function parseProjects(sectionId, includeDate) {
    const section = document.getElementById(sectionId);
    if (!section) return [];

    const cards = section.querySelectorAll('.project-item');
    return Array.from(cards).map((card) => {
      const title = card.querySelector('h3')?.textContent?.trim() || 'N/A';
      const detailLines = Array.from(card.querySelectorAll('p')).map((p) =>
        p.textContent.replace(/\s+/g, ' ').trim()
      );

      const projectInfo = extractField(detailLines, 'Project Info:');
      const location = extractField(detailLines, 'Location:');
      const date = includeDate ? extractField(detailLines, 'Date of Commission:') : '-';

      return { title, projectInfo, location, date };
    });
  }

  function buildPdf() {
    if (!window.jspdf || !window.jspdf.jsPDF || typeof window.jspdf.jsPDF.API.autoTable !== 'function') {
      alert('PDF library failed to load. Please check your internet connection and try again.');
      return;
    }

    const currentProjects = parseProjects('projects', false);
    const pastProjects = parseProjects('past-projects', true);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    doc.setFontSize(18);
    doc.text('SK Builders - Projects Portfolio', 40, 46);

    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text('Company: Krishna Enterprises', 40, 66);
    doc.text('GSTIN: 36AFTPT3563P1ZB', 40, 82);
    doc.text('Established in 2003', 40, 98);

    doc.setFontSize(13);
    doc.setTextColor(25);
    doc.text('Current Projects', 40, 128);

    doc.autoTable({
      startY: 138,
      head: [['Project Name', 'Project Info', 'Location']],
      body: currentProjects.map((project) => [project.title, project.projectInfo, project.location]),
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 6 },
      headStyles: { fillColor: [20, 75, 58] },
      alternateRowStyles: { fillColor: [248, 243, 233] }
    });

    const nextY = doc.lastAutoTable.finalY + 28;
    doc.setFontSize(13);
    doc.text('Past Projects', 40, nextY);

    doc.autoTable({
      startY: nextY + 10,
      head: [['Project Name', 'Project Info', 'Location', 'Date of Commission']],
      body: pastProjects.map((project) => [project.title, project.projectInfo, project.location, project.date]),
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 6 },
      headStyles: { fillColor: [20, 75, 58] },
      alternateRowStyles: { fillColor: [248, 243, 233] }
    });

    doc.save('sk-builders-projects-portfolio.pdf');
  }

  if (downloadButton) {
    downloadButton.addEventListener('click', buildPdf);
  }
})();
