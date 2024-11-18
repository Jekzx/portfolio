document.addEventListener('DOMContentLoaded', () => {
  const languageToggle = document.querySelector('#language-toggle');
  const body = document.body;

  // Função para atualizar o conteúdo com base no idioma
  function updateLanguage(isEnglish) {
      const ptContent = {
          'about-title': 'Sobre Mim',
          'about-text': 'Sou um desenvolvedor apaixonado por tecnologia e com um forte interesse em programação...',
          'skills-title': 'Habilidades',
          'hard-skills-title': 'Hard Skills',
          'soft-skills-title': 'Soft Skills',
          'experience-title': 'Experiência',
          'experience-job1': 'Técnico de TI - JGM Serviços',
          'experience-date1': 'Março 2023 - Julho 2023',
          'experience-description1': 'Responsável por suportar os sistemas internos da empresa, diagnosticar e resolver problemas técnicos...',
          'experience-job2': 'Estagiário de TI - Clínicas Reunidas São Víctor',
          'experience-date2': 'Agosto 2021 - Fevereiro 2022',
          'experience-description2': 'Apoio técnico, instalação e manutenção de sistemas, além de lidar com suporte aos usuários...',
          'education-title': 'Educação',
          'education-degree': 'Graduação em Análise e Desenvolvimento de Sistemas',
          'education-date': '2021 - 2024',
          'contact-title': 'Contato',
          'contact-email': 'Email: gabrielrodrigues23@proton.me',
          'contact-phone': 'Telefone: (21) 99585-2036',
          'download-text': 'Baixar Currículo'
      };

      const enContent = {
          'about-title': 'About Me',
          'about-text': 'I am a passionate developer with a strong interest in programming...',
          'skills-title': 'Skills',
          'hard-skills-title': 'Hard Skills',
          'soft-skills-title': 'Soft Skills',
          'experience-title': 'Experience',
          'experience-job1': 'IT Technician - JGM Services',
          'experience-date1': 'March 2023 - July 2023',
          'experience-description1': 'Responsible for supporting the company\'s internal systems, diagnosing, and troubleshooting...',
          'experience-job2': 'IT Intern - Clínicas Reunidas São Víctor',
          'experience-date2': 'August 2021 - February 2022',
          'experience-description2': 'Technical support, system installation, and maintenance, as well as dealing with user support...',
          'education-title': 'Education',
          'education-degree': 'Bachelor\'s in System Analysis and Development',
          'education-date': '2021 - 2024',
          'contact-title': 'Contact',
          'contact-email': 'Email: gabrielrodrigues23@proton.me',
          'contact-phone': 'Phone: (21) 99585-2036',
          'download-text': 'Download Resume'
      };

      const content = isEnglish ? enContent : ptContent;

      for (const key in content) {
          document.getElementById(key).textContent = content[key];
      }

      // Troca a classe para aplicar o idioma
      body.classList.toggle('en', isEnglish);
  }

  // Inicializa a página com o idioma português
  updateLanguage(false);

  // Altera o idioma ao clicar no toggle
  languageToggle.addEventListener('change', (event) => {
      updateLanguage(event.target.checked);
  });
});
