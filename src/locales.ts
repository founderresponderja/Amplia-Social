export type AppLanguage = 'pt-PT' | 'en' | 'es';

export interface TranslationSchema {
  // Common / Navbar
  appName: string;
  appSubtitle: string;
  loginButton: string;
  logoutButton: string;
  profileButton: string;
  dashboardButton: string;
  themeToggle: string;
  uiLanguageLabel: string;
  
  // Login
  loginTitle: string;
  loginSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  signInBtn: string;
  demoAccessBtn: string;
  loginSuccess: string;
  loginError: string;
  guestWarning: string;

  // Profile / Settings
  profileTitle: string;
  profileSubtitle: string;
  saveProfileBtn: string;
  backToDashboard: string;
  sectionAccounts: string;
  sectionAccountsDesc: string;
  sectionApiKeys: string;
  sectionApiKeysDesc: string;
  fieldChannelUsername: string;
  fieldChannelPassword: string;
  geminiKeyLabel: string;
  geminiKeyPlaceholder: string;
  customGeminiDesc: string;
  saveSuccess: string;
  
  // Sidebar
  sidebarTitle: string;
  sidebarDesc: string;
  searchPlaceholder: string;
  clearAllBtn: string;
  emptyHistory: string;
  dateCreated: string;
  confirmClearAll: string;

  // Composer
  composerTitle: string;
  composerSubtitle: string;
  conceptLabel: string;
  conceptPlaceholder: string;
  conceptHelp: string;
  templatesLabel: string;
  targetLangLabel: string;
  toneLabel: string;
  generateBtn: string;
  generatingBtn: string;

  // Platforms Preview
  previewTitle: string;
  basedOnIdea: string;
  allFeeds: string;
  editCopyTitle: string;
  cancelBtn: string;
  saveBtn: string;
  copyBtn: string;
  copiedBtn: string;
  aiTranslateLabel: string;
  aiTranslateBtn: string;
  aiTranslating: string;
  schedulerTitle: string;
  scheduledBadge: string;
  draftBadge: string;
  clearTimeBtn: string;
  imageGenTitle: string;
  imageLoadingLabel: string;
  uploadImageBtn: string;
  noImageYet: string;
  uploadPhotoBtn: string;
  artPromptLabel: string;
  artPromptPlaceholder: string;
  regenerateImageBtn: string;
  interactionsLikes: string;
  interactionsComments: string;

  // System
  systemUpdate: string;
  successTitle: string;
}

export const translations: Record<AppLanguage, TranslationSchema> = {
  'pt-PT': {
    appName: 'Ressoa',
    appSubtitle: 'Uma ideia, todas as redes',
    loginButton: 'Entrar',
    logoutButton: 'Terminar Sessão',
    profileButton: 'Meu Perfil',
    dashboardButton: 'Painel',
    themeToggle: 'Alternar Tema',
    uiLanguageLabel: 'Idioma da UI',
    
    loginTitle: 'Iniciar Sessão',
    loginSubtitle: 'Aceda à sua conta Ressoa para gerir credenciais',
    emailLabel: 'Endereço de E-mail',
    passwordLabel: 'Palavra-passe',
    emailPlaceholder: 'exemplo@empresa.pt',
    passwordPlaceholder: 'Introduza a sua palavra-passe',
    signInBtn: 'Iniciar Sessão',
    demoAccessBtn: 'Aceder como Demonstração',
    loginSuccess: 'Sessão iniciada com sucesso!',
    loginError: 'E-mail ou palavra-passe incorretos.',
    guestWarning: 'Nota: Os dados das credenciais serão guardados localmente de forma segura no seu navegador para efeitos de demonstração.',

    profileTitle: 'Perfis e Credenciais',
    profileSubtitle: 'Configure os seus canais associados, palavras-passe e chaves de API da IA de forma segura.',
    saveProfileBtn: 'Guardar Configurações',
    backToDashboard: 'Voltar ao Painel',
    sectionAccounts: 'Contas e Acessos Sociais',
    sectionAccountsDesc: 'Insira o nome de utilizador e a palavra-passe que o Ressoa usará para indexar os canais.',
    sectionApiKeys: 'Chaves de API das Plataformas',
    sectionApiKeysDesc: 'Chaves secretas para personalização e geração avançada autónoma.',
    fieldChannelUsername: 'Utilizador / Link',
    fieldChannelPassword: 'Palavra-passe do Canal',
    geminiKeyLabel: 'Chave de API Gemini Pro (Opcional)',
    geminiKeyPlaceholder: 'AIzaSy...',
    customGeminiDesc: 'Se configurada, a aplicação utilizará a sua própria chave Gemini para maior flexibilidade.',
    saveSuccess: 'Configurações de perfil guardadas com sucesso!',

    sidebarTitle: 'Rascunhos Guardados',
    sidebarDesc: 'Histórico de kits e publicações geradas.',
    searchPlaceholder: 'Filtrar rascunhos...',
    clearAllBtn: 'Limpar Tudo',
    emptyHistory: 'Sem rascunhos no histórico.',
    dateCreated: 'Criado em',
    confirmClearAll: 'Tem a certeza que deseja eliminar todos os rascunhos?',

    composerTitle: 'Editor de Conteúdo',
    composerSubtitle: 'Insira o conceito simples para gerar publicações adaptadas.',
    conceptLabel: 'Conceito Central ou Ideia',
    conceptPlaceholder: 'Ex: Apresentar o lançamento de uma garrafa térmica inteligente que avisa metas de hidratação...',
    conceptHelp: 'Suporta inserção em qualquer língua',
    templatesLabel: 'Modelos de Exemplo:',
    targetLangLabel: 'Idioma de Saída (Fórmula de Escrita)',
    toneLabel: 'Tom de Voz Editorial Desejado',
    generateBtn: 'Gerar Conteúdo e Imagens',
    generatingBtn: 'A gerar portefólio social em...',

    previewTitle: 'Kit de Publicação Ativo',
    basedOnIdea: 'Com base na ideia:',
    allFeeds: 'Todos os Feeds',
    editCopyTitle: 'Editar rascunho de texto',
    cancelBtn: 'Cancelar',
    saveBtn: 'Guardar',
    copyBtn: 'Copiar Texto',
    copiedBtn: 'Copiado!',
    aiTranslateLabel: 'Tradução por IA',
    aiTranslateBtn: 'Traduzir',
    aiTranslating: 'A traduzir...',
    schedulerTitle: 'Agendador de Publicação',
    scheduledBadge: 'Agendado',
    draftBadge: 'Rascunho',
    clearTimeBtn: 'Limpar',
    imageGenTitle: 'Quadro Visual de Imagem',
    imageLoadingLabel: 'A desenhar imagem com IA...',
    uploadImageBtn: 'Substituir Imagem',
    noImageYet: 'Sem imagem personalizada',
    uploadPhotoBtn: 'Carregar Foto Manual',
    artPromptLabel: 'Instruções de Arte Visual',
    artPromptPlaceholder: 'Descreva os elementos de arte...',
    regenerateImageBtn: 'Regenerar com IA',
    interactionsLikes: 'comentários',
    interactionsComments: 'partilhas',

    systemUpdate: 'Notificação do Sistema:',
    successTitle: 'Sucesso',
  },
  'en': {
    appName: 'Ressoa',
    appSubtitle: 'One idea, every network',
    loginButton: 'Login',
    logoutButton: 'Logout',
    profileButton: 'My Profile',
    dashboardButton: 'Dashboard',
    themeToggle: 'Toggle Theme',
    uiLanguageLabel: 'UI Language',

    loginTitle: 'Sign In',
    loginSubtitle: 'Log in to your Ressoa account to manage credentials',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    emailPlaceholder: 'you@company.com',
    passwordPlaceholder: 'Enter your password',
    signInBtn: 'Sign In',
    demoAccessBtn: 'Continue as Guest',
    loginSuccess: 'Login successful!',
    loginError: 'Incorrect email or password.',
    guestWarning: 'Note: Credentials and API keys will be persisted safely in your local browser storage for client-side demo simulation.',

    profileTitle: 'Profiles & Secrets',
    profileSubtitle: 'Configure your connected social channels, passwords, and custom AI API keys securely.',
    saveProfileBtn: 'Save Settings',
    backToDashboard: 'Back to Dashboard',
    sectionAccounts: 'Social Channels Access',
    sectionAccountsDesc: 'Add client profile links or handles and local passwords used to queue publications.',
    sectionApiKeys: 'Platform API Credentials',
    sectionApiKeysDesc: 'Add secret keys and custom integrations to power your advanced automatic publisher.',
    fieldChannelUsername: 'Username / URL',
    fieldChannelPassword: 'Channel Password',
    geminiKeyLabel: 'Gemini Pro API Key (Optional)',
    geminiKeyPlaceholder: 'AIzaSy...',
    customGeminiDesc: 'If provided, the system will execute generative calls using your personal API key directly.',
    saveSuccess: 'Profile settings saved successfully!',

    sidebarTitle: 'Saved Drafts',
    sidebarDesc: 'History of compiled cross-platform suites.',
    searchPlaceholder: 'Search drafts...',
    clearAllBtn: 'Clear All',
    emptyHistory: 'No drafts found in history.',
    dateCreated: 'Created on',
    confirmClearAll: 'Are you sure you want to delete all saved drafts?',

    composerTitle: 'Publish Concept Composer',
    composerSubtitle: 'Enter a high-level conceptual brief to output targeted drafts.',
    conceptLabel: 'Core Concept or Subject Topic',
    conceptPlaceholder: 'Ex: Announcing a smart vacuum flask that sanitizes contents using UV-C light...',
    conceptHelp: 'Input in any writing language',
    templatesLabel: 'Example Templates:',
    targetLangLabel: 'Target Narrative Language',
    toneLabel: 'Desired Editorial Tone & Voice',
    generateBtn: 'Generate Content & Visuals',
    generatingBtn: 'Crafting Social Marketing Kit in...',

    previewTitle: 'Active Publication Kit',
    basedOnIdea: 'Based on campaign brief:',
    allFeeds: 'All Connected Feeds',
    editCopyTitle: 'Edit copy draft text',
    cancelBtn: 'Cancel',
    saveBtn: 'Save',
    copyBtn: 'Copy Text',
    copiedBtn: 'Copied!',
    aiTranslateLabel: 'AI Translation Pro',
    aiTranslateBtn: 'Translate Text',
    aiTranslating: 'Translating...',
    schedulerTitle: 'Publication Scheduler',
    scheduledBadge: 'Scheduled',
    draftBadge: 'Draft Only',
    clearTimeBtn: 'Clear',
    imageGenTitle: 'Image Visual Art Frame',
    imageLoadingLabel: 'Drawing beautiful context art...',
    uploadImageBtn: 'Replace with File',
    noImageYet: 'No visual asset attached',
    uploadPhotoBtn: 'Upload Custom Photo',
    artPromptLabel: 'Visual Art Direction Prompt',
    artPromptPlaceholder: 'Adjust visual descriptions...',
    regenerateImageBtn: 'Re-generate Image',
    interactionsLikes: 'comments',
    interactionsComments: 'shares',

    systemUpdate: 'System Notification:',
    successTitle: 'Success',
  },
  'es': {
    appName: 'Ressoa',
    appSubtitle: 'Una idea, todas las redes',
    loginButton: 'Iniciar Sesión',
    logoutButton: 'Cerrar Sesión',
    profileButton: 'Mi Perfil',
    dashboardButton: 'Tablero',
    themeToggle: 'Alternar Tema',
    uiLanguageLabel: 'Idioma de Interfaz',

    loginTitle: 'Iniciar Sesión',
    loginSubtitle: 'Inicie sesión en su cuenta de Ressoa para gestionar credenciales',
    emailLabel: 'Correo Electrónico',
    passwordLabel: 'Contraseña',
    emailPlaceholder: 'correo@empresa.com',
    passwordPlaceholder: 'Introduzca su contraseña',
    signInBtn: 'Iniciar Sesión',
    demoAccessBtn: 'Acceder como Invitado',
    loginSuccess: '¡Sesión iniciada con éxito!',
    loginError: 'Correo o contraseña incorrectos.',
    guestWarning: 'Nota: Los datos confidenciales se guardarán localmente de forma segura en su navegador para la simulación interactiva.',

    profileTitle: 'Perfiles y Credenciales',
    profileSubtitle: 'Configure sus canales de comunicación, contraseñas y claves de API de forma segura.',
    saveProfileBtn: 'Guardar Configuración',
    backToDashboard: 'Volver al Tablero',
    sectionAccounts: 'Cuentas y Accesos Sociales',
    sectionAccountsDesc: 'Indique los enlaces o usuarios y las contraseñas que el sistema usará para indexar canales.',
    sectionApiKeys: 'Credenciales de Plataforma',
    sectionApiKeysDesc: 'Claves de API de generación inteligentes para automatizar operaciones de publicación.',
    fieldChannelUsername: 'Usuario / Enlace',
    fieldChannelPassword: 'Contraseña del Canal',
    geminiKeyLabel: 'Clave de API de Gemini Pro (Opcional)',
    geminiKeyPlaceholder: 'AIzaSy...',
    customGeminiDesc: 'Al proporcionar su propia clave Gemini, se procesarán las peticiones a través de ella de forma nativa.',
    saveSuccess: '¡Configuración de perfil guardada con éxito!',

    sidebarTitle: 'Borradores Guardados',
    sidebarDesc: 'Historial de campañas y lotes generados.',
    searchPlaceholder: 'Filtrar borradores...',
    clearAllBtn: 'Limpar Todo',
    emptyHistory: 'No hay borradores en el historial.',
    dateCreated: 'Creado el',
    confirmClearAll: '¿Está seguro de que desea eliminar todos los borradores?',

    composerTitle: 'Editor de Contenido',
    composerSubtitle: 'Introduzca una idea conceptual para generar el conjunto de publicaciones.',
    conceptLabel: 'Concepto Central o Tema',
    conceptPlaceholder: 'Ej: Presentación de una botella inteligente que sanitiza el agua con luces UV-C...',
    conceptHelp: 'Permite redactar el concepto en cualquier idioma',
    templatesLabel: 'Ejemplos listos:',
    targetLangLabel: 'Idioma de Redacción de Publicación',
    toneLabel: 'Tono Editorial Deseado',
    generateBtn: 'Generar Campaña Completa',
    generatingBtn: 'Creando conjunto social en...',

    previewTitle: 'Kit de Publicación Activo',
    basedOnIdea: 'Basado en la campaña:',
    allFeeds: 'Todos los Canales',
    editCopyTitle: 'Editar texto borrador',
    cancelBtn: 'Cancelar',
    saveBtn: 'Guardar',
    copyBtn: 'Copiar Texto',
    copiedBtn: '¡Copiado!',
    aiTranslateLabel: 'Traducción Avanzada por IA',
    aiTranslateBtn: 'Traducir',
    aiTranslating: 'Traduciendo...',
    schedulerTitle: 'Programador de Publicaciones',
    scheduledBadge: 'Programado',
    draftBadge: 'Borrador',
    clearTimeBtn: 'Limpiar',
    imageGenTitle: 'Panel de Arte Visual IA',
    imageLoadingLabel: 'Preparando diseño con IA...',
    uploadImageBtn: 'Subir Imagen',
    noImageYet: 'Sin imagen cargada',
    uploadPhotoBtn: 'Cargar Foto Manual',
    artPromptLabel: 'Indicaciones de Arte Gráfico',
    artPromptPlaceholder: 'Modifique los atributos de imagen...',
    regenerateImageBtn: 'Regenerar con IA',
    interactionsLikes: 'comentarios',
    interactionsComments: 'reacciones',

    systemUpdate: 'Notificación del Sistema:',
    successTitle: 'Éxito',
  }
};
