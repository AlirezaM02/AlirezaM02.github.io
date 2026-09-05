'use strict';
// Curated, owner-reviewed context. Scale figures are snapshots, not a live feed.
const projects = [
  {
    id: 'baresh', name: 'Baresh', category: 'professional', kind: 'ANACAV / B2C ENERGY PRODUCT',
    title: 'An electricity platform built around its users.',
    description: 'Baresh is a B2C product for industrial towns, combining electricity-usage visibility with the features customers need to use the service day to day. I spearheaded the project from the outset, leading its initial development across backend and data engineering.',
    points: [
      'Customer-facing features include service packages, SMS, notifications, usage dashboards, and user rankings.',
      'The data platform serves 35,000 entities with usage data updated at intervals under ten minutes; coverage is growing.',
      'Built ETL and orchestration workflows with Dagster, asynchronous processing with Celery, and backend services with Django.',
      'Participated in a project-wide performance refactor as the product and its data workloads evolved.'
    ],
    tech: ['Python', 'Django', 'Dagster', 'Celery', 'ETL', 'SQL'],
    notice: 'Professional work at Anacav · Proprietary product.'
  },
  {
    id: 'payesh', name: 'Payesh · electricity distribution', category: 'professional', kind: 'ANACAV / B2B MONITORING & REPORTING',
    title: 'From consumption reports to demand management.',
    description: 'Payesh is a B2B monitoring and reporting product for electricity distribution companies. Its dashboards give managers visibility across feeders, businesses, organizational units, and customer classes—both individually and in aggregate.',
    points: [
      'Multiple dashboards and reports cover feeder and business consumption, company units, and combined totals.',
      'Supports setting consumption limits for different business classes and notifying affected customers.',
      'Shows customer performance and compliance against assigned limits, supporting efforts to reduce electricity usage.',
      'My work spans the backend and data processing behind these reporting and product features.'
    ],
    tech: ['Backend', 'Data processing', 'Dashboards', 'Reporting', 'Demand management'],
    notice: 'Professional work at Anacav · Proprietary product.'
  },
  {
    id: 'waterdam', name: 'Hydropower dam monitoring', category: 'professional', kind: 'ANACAV / ENERGY MONITORING',
    title: 'Monitoring hydroelectric dams.',
    description: 'A hydropower dam monitoring project developed at Anacav. I participated in its development alongside other electrical-energy products.',
    points: ['The public overview is limited to the project’s purpose to respect confidentiality obligations.'],
    tech: ['Energy systems', 'Monitoring'], notice: 'Professional work at Anacav · Proprietary product.'
  },
  {
    id: 'miner', name: 'Miner detection', category: 'professional', kind: 'ANACAV / ELECTRICAL-DATA APPLICATION',
    title: 'Detecting cryptocurrency miners.',
    description: 'An Anacav project focused on identifying cryptocurrency miners. I participated in the development of the system.',
    points: ['Detection methods, underlying data, and implementation details remain confidential.'],
    tech: ['Electrical data', 'Detection'], notice: 'Professional work at Anacav · Proprietary product.'
  },
  {
    id: 'hermes', name: 'Hermes · model-aware delegation', category: 'opensource', kind: 'HERMES AGENT / MODEL ROUTING EXTENSION',
    title: 'Model-aware delegation for Hermes Agent.',
    description: 'An extension I developed in my Hermes Agent branch to make model selection explicit for delegated tasks. Tasks can request a configured capability or model instead of relying only on the parent’s route.',
    points: [
      'Capability tags, model categories, and explicit model selectors with a defined resolution order.',
      'Fallback to the inherited or configured delegation route when an alias is unknown.',
      'Dependency-aware task ordering while preserving parallel execution for independent work.',
      'Typed selection contracts, validation, tests, and developer documentation.'
    ],
    tech: ['Python', 'Agent orchestration', 'Model routing', 'Validation'],
    url: 'https://github.com/NousResearch/hermes-agent', linkLabel: 'Hermes Agent · upstream project ↗'
  },
  {
    id: 'ransomxd', name: 'RansomXD', category: 'public', kind: 'BSC PROJECT / SECURITY & ML',
    title: 'Ransomware detection through machine learning.',
    description: 'My undergraduate project at Isfahan University of Technology explored ransomware detection using executable-file characteristics and access patterns.',
    points: ['Combined feature engineering with models including XGBoost and Random Forest.', 'Investigated how file-level behavior can inform a security classification task.'],
    tech: ['Machine learning', 'Security', 'Feature engineering'], url: 'https://github.com/AlirezaM02/RansomXD-BScPrj'
  },
  {
    id: 'recommerce', name: 'Recommerce', category: 'public', kind: 'ACADEMIC / RECOMMENDER SYSTEMS',
    title: 'Comparing recommendation approaches.',
    description: 'An academic recommender-system project comparing several algorithms, with attention to understanding and cleaning the input data.',
    points: ['Explores recommendation methods and the preparation work that makes their comparison meaningful.'],
    tech: ['Python', 'Notebooks', 'Recommendations'], url: 'https://github.com/AlirezaM02/Recommerce'
  },
  {
    id: 'breakout', name: 'Atari Breakout', category: 'public', kind: 'ACADEMIC / REINFORCEMENT LEARNING',
    title: 'Learning to play Atari Breakout.',
    description: 'A reinforcement-learning project using the Gym environment to explore an agent learning to play Atari Breakout.',
    points: ['An academic exploration of learning through interaction with a game environment.'],
    tech: ['Python', 'Gym', 'Reinforcement learning'], url: 'https://github.com/AlirezaM02/Gym-BreakOut-RI'
  },
  {
    id: 'manticore', name: 'Manticore', category: 'public', kind: 'TEAM PROJECT / DATA MINING',
    title: 'Understanding employee attrition.',
    description: 'A team data-mining project analyzing and predicting employee attrition with machine learning, with the goal of presenting attrition risk through a dashboard or service.',
    points: ['Developed as a team project with Mohammad Mahdi Khosravi and Mohammad Hossein Ghanbari.'],
    tech: ['Python', 'Data mining', 'Team project'], url: 'https://github.com/AlirezaM02/dm-project-manticore'
  }
];
const list = document.querySelector('#project-list');
const detail = document.querySelector('#project-detail');
let filter = 'all';
let selected = projects[0].id;
const categoryLabels = {professional: 'PROFESSIONAL', public: 'PUBLIC REPOSITORY', opensource: 'OPEN-SOURCE CONTRIBUTIONS'};

function element(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function selectProject(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return;
  selected = id;
  list.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
  detail.replaceChildren();
  const top = element('div', 'detail-top');
  top.append(element('span', '', categoryLabels[p.category]), element('span', '', 'PROJECT / ' + String(projects.indexOf(p) + 1).padStart(2, '0')));
  detail.append(top);
  const title = element('h3', '', p.title);
  title.id = 'detail-title';
  detail.setAttribute('aria-labelledby', 'detail-title');
  detail.append(title, element('p', '', p.description));
  const points = element('ul', 'detail-points');
  p.points.forEach(s => points.append(element('li', '', s)));
  detail.append(points);
  const tech = element('div', 'tech-list');
  tech.setAttribute('aria-label', 'Technologies and topics');
  p.tech.forEach(s => tech.append(element('span', '', s)));
  detail.append(tech);
  if (p.url) {
    const a = element('a', 'detail-action', p.linkLabel || 'View repository ↗');
    a.href = p.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    detail.append(a);
  } else {
    detail.append(element('div', 'detail-notice', p.notice));
  }
  const count = projects.filter(p => filter === 'all' || p.category === filter).length;
  document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'} · Viewing ${p.name}`;
}
function renderList() {
  const visible = projects.filter(p => filter === 'all' || p.category === filter);
  list.replaceChildren();
  visible.forEach(p => {
    const b = element('button', 'project-item');
    b.type = 'button';
    b.dataset.id = p.id;
    b.setAttribute('aria-controls', 'project-detail');
    b.setAttribute('aria-pressed', 'false');
    b.append(element('span', 'index', String(projects.indexOf(p) + 1).padStart(2, '0')));
    const labels = element('span');
    labels.append(element('strong', '', p.name), element('small', '', p.kind));
    b.append(labels, element('span', 'arrow', '↗'));
    b.addEventListener('click', () => selectProject(p.id));
    list.append(b);
  });
  if (!visible.some(p => p.id === selected)) selected = visible[0].id;
  selectProject(selected);
}
document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
  filter = b.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  renderList();
}));
const focusContent = {
  backend: {title: 'From requirements to working services.', text: 'Product behavior, service boundaries, asynchronous jobs, and the APIs behind user-facing features.', stack: 'PYTHON / DJANGO / FLASK / CELERY'},
  data: {title: 'Keep the data moving. Make it useful.', text: 'ETL, workflow orchestration, and SQL—connecting incoming electricity-usage data to reporting and customer-facing products.', stack: 'DAGSTER / ETL / SQL / DATA WORKFLOWS'},
  linux: {title: 'The layer underneath the product.', text: 'Linux servers, containerized services, CI/CD, and monitoring. Infrastructure experience that still informs how I build software.', stack: 'LINUX / DOCKER / GITLAB CI/CD / MONITORING'}
};
document.querySelectorAll('[data-focus]').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('[data-focus]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  const focus = focusContent[b.dataset.focus];
  const panel = document.querySelector('#focus-detail');
  panel.replaceChildren(element('h3', '', focus.title), element('p', '', focus.text), element('span', 'focus-stack', focus.stack));
}));
const themeButton = document.querySelector('#theme');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1a201c' : '#f3f1e9';
}
// New preference key gives existing preview visitors the requested dark default.
try {
  const saved = localStorage.getItem('am-theme-v2');
  if (saved === 'dark' || saved === 'light') setTheme(saved);
} catch (_) { /* Storage may be unavailable. */ }
themeButton.addEventListener('click', () => {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(t);
  try { localStorage.setItem('am-theme-v2', t); } catch (_) {}
});
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('alirezamirzaei68@gmail.com');
    status.textContent = 'Email copied.';
  } catch (_) {
    status.textContent = 'Please select and copy the email address above; clipboard access is unavailable.';
  }
});
renderList();
