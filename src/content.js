/* Edición editorial: la web distingue formación del alumnado, competencias verificadas y plan organizativo propuesto. */
window.TALENTO_CONFIG = {
  // Introducir SOLO entidades con colaboración histórica contrastada. Se muestran nombres tipográficos, no logos.
  partners: [], // [{name:'Entidad', verified:true}]
  photos: {
    hero: './assets/photos/alumnado-aula.webp',
    smr: './assets/photos/smr-taller.webp',
    dam: './assets/photos/dam-proyecto.webp',
  },
};
window.TALENTO_CYCLES = {
  smr: {
    short: 'SMR',
    level: 'Grado Medio · Sistemas Microinformáticos y Redes',
    title: 'Sistemas y soporte que ayudan a que todo funcione.',
    description:
      'Equipos, sistemas operativos, conectividad, redes y atención a incidencias: conocimientos útiles para la actividad diaria de cualquier organización. Nuestro alumnado puede colaborar en tareas de soporte y mantenimiento ajustadas a su preparación.',
    skills: [
      'Equipos · instalación y mantenimiento',
      'Windows · Linux',
      'Redes · conectividad',
      'Servicios básicos de red',
      'Soporte · inventario · documentación',
      'WordPress · mantenimiento web sencillo',
    ],
    image: './assets/photos/smr-taller.webp',
    imageAlt: 'Alumnado de SMR realizando prácticas de redes o montaje de equipos',
    years: [
      {
        year: '1.º',
        phase: 'Primer contacto con tareas técnicas reales',
        period: 'Febrero',
        duration: 'Primera estancia formativa',
        autonomy:
          'Nivel inicial. Tareas bien delimitadas, supervisión próxima y aprendizaje de los procedimientos de la empresa.',
        tasks: [
          'Preparar equipos, instalar software y configurar sistemas con instrucciones claras.',
          'Conocer herramientas de soporte, inventarios y procedimientos del centro de trabajo.',
          'Apoyar comprobaciones sencillas de conectividad y documentación técnica.',
        ],
      },
      {
        year: '2.º',
        phase: 'Colaborar en el soporte del día a día',
        period: 'Marzo – principios de junio',
        duration: 'Estancia prolongada',
        autonomy:
          'Mayor soltura en tareas conocidas; las configuraciones complejas y los sistemas críticos requieren supervisión.',
        tasks: [
          'Apoyar el mantenimiento de equipos, puestos de trabajo y servicios informáticos habituales.',
          'Realizar comprobaciones de red y diagnósticos iniciales, con supervisión cuando sea necesario.',
          'Documentar incidencias, actualizar inventarios y participar en mantenimiento web sencillo.',
        ],
      },
    ],
    calendarTitle: 'SMR: incorporaciones adaptadas a cada curso.',
    bars: [
      { label: '1.º SMR', start: 0, width: 20, kind: 'intro', caption: 'Primer contacto' },
      { label: '2.º SMR', start: 20, width: 62, kind: 'full', caption: 'Mayor integración' },
    ],
    note: '1.º realiza su primera estancia en febrero y 2.º participa de marzo a principios de junio. Las fechas definitivas se coordinan con el centro y la empresa.',
    cta: '¿Te aportaría valor?',
    mentoring: false,
  },
  dam: {
    short: 'DAM',
    level: 'Grado Superior · Desarrollo de Aplicaciones Multiplataforma',
    title: 'Tecnología que conecta aplicaciones, datos y procesos.',
    description:
      'DAM no es solo programación. Nuestro alumnado combina desarrollo de software con bases de datos, interfaces, integración de herramientas, automatización y soluciones para el trabajo diario. Puede participar en tareas concretas que ayuden a mejorar aplicaciones, información y procesos de empresas de distintos sectores.',
    skills: [
      'Java · Spring Boot · APIs',
      'Python · automatización',
      'Bases de datos · información',
      'Interfaces · React · JavaFX',
      'Odoo · Power BI · gestión',
      'Testing · Git · Docker',
    ],
    image: './assets/photos/dam-proyecto.webp',
    imageAlt: 'Alumnado de DAM desarrollando aplicaciones y colaborando en un proyecto',
    years: [
      {
        year: '1.º',
        phase: 'Conocer tu empresa. Empezar a formar parte de su entorno.',
        period: 'Finales de mayo · primera estancia breve',
        duration: 'Familiarización',
        autonomy:
          'Primera inmersión profesional. El objetivo principal es comprender el entorno, adaptarse y aprender; sirve de toma de contacto inicial, con actividades guiadas y una acogida progresiva.',
        tasks: [
          'Conocer la cultura del equipo, su organización, las personas y la forma cotidiana de trabajar.',
          'Descubrir herramientas, tecnologías, proyectos, procedimientos y buenas prácticas utilizadas en la empresa.',
          'Acompañar a profesionales, observar procesos y, cuando proceda, realizar pequeñas actividades guiadas de código, pruebas o documentación.',
        ],
      },
      {
        year: '2.º',
        phase: 'Integrarse en el equipo y aportar en retos concretos',
        period: 'Finales de febrero – principios de junio',
        duration: 'Estancia prolongada',
        autonomy:
          'Conocimientos más avanzados y autonomía progresiva en tareas delimitadas; el trabajo crítico y las decisiones técnicas permanecen bajo supervisión profesional.',
        tasks: [
          'Colaborar en funcionalidades acotadas, interfaces, APIs y pruebas de aplicaciones.',
          'Apoyar tareas de datos, automatización, Python, Odoo y otras herramientas de gestión según la actividad de la empresa.',
          'Trabajar con Git, documentar soluciones y participar en despliegues guiados cuando corresponda.',
        ],
      },
    ],
    calendarTitle: 'DAM: dos promociones. Una incorporación más fácil.',
    bars: [
      {
        label: '2.º DAM',
        start: 15,
        width: 67,
        kind: 'full',
        caption: 'Integración y aportación progresiva',
      },
      { label: '1.º DAM', start: 75, width: 7, kind: 'intro', caption: 'Acogida' },
    ],
    note: 'Propuesta organizativa: 2.º se incorpora a finales de febrero; 1.º llega durante los últimos días de mayo, aproximadamente diez días antes de la finalización conjunta prevista a principios de junio. Calendario sujeto a aprobación y coordinación con las empresas.',
    mentoring: true,
    mentoringTitle: 'El alumnado de 2.º facilita la acogida del de 1.º.',
    mentoringText:
      'Durante el periodo de coincidencia, el alumnado de 2.º puede presentar a 1.º las herramientas, rutinas, cultura de equipo y tecnologías que ya conoce. Así se facilita la adaptación, se aprovecha la experiencia acumulada y se reduce parte del esfuerzo inicial de acogida.',
    cta: '¿Podría encajar en mi empresa?',
  },
};
