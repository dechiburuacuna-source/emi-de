import type { Article } from '@/types/article'

export const MOCK_ARTICLES: Article[] = [
  // ─── Mining ───────────────────────────────────────────────
  {
    id: 'mock-001',
    title: 'Chile copper output rises 4.2% in Q1 driven by Escondida ramp-up',
    title_es: 'Producción de cobre de Chile sube 4,2% en el primer trimestre impulsada por la recuperación de Escondida',
    source: 'Cochilco',
    source_type: 'Institutional',
    location: 'Chile',
    category: 'Mining',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    url: 'https://www.cochilco.cl/Listado%20Materias/produccion-cobre-q1.pdf',
    extended_description:
      `Chilean copper production posted a 4.2% year-on-year increase in the first quarter, according to preliminary Cochilco data. The recovery at the Escondida mine, operated by BHP, was the primary driver after maintenance-related disruptions in late 2023. The uptick comes as global copper demand strengthens on the back of energy-transition investments, including EV manufacturing and grid-scale storage projects. Analysts note that further gains depend on water availability in the Atacama region and ongoing labor negotiations at several mid-tier operations.`,
    extended_description_es:
      `La producción de cobre de Chile registró un aumento interanual del 4,2% en el primer trimestre, según datos preliminares de Cochilco. La recuperación en la mina Escondida, operada por BHP, fue el principal motor tras las interrupciones por mantenimiento a finales de 2023. El repunte llega cuando la demanda mundial de cobre se fortalece en el marco de las inversiones en transición energética. Los analistas señalan que las ganancias adicionales dependen de la disponibilidad de agua en la región de Atacama.`,
    short_summary: [
      `Chile copper output grew 4.2% YoY in Q1, reversing late-2023 maintenance disruptions at Escondida.`,
      `BHP-operated Escondida led the recovery, underpinned by strong global demand for energy-transition materials.`,
      `Water availability and labor contracts remain key risk factors for sustained production growth.`,
    ],
    short_summary_es: [
      `La producción de cobre de Chile creció 4,2% interanual en el primer trimestre, revirtiendo disrupciones de mantenimiento.`,
      `Escondida, operada por BHP, lideró la recuperación respaldada por la sólida demanda global.`,
      `La disponibilidad de agua y los contratos laborales son los principales factores de riesgo.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },
  {
    id: 'mock-002',
    title: 'Mining.com: lithium price correction forces producers to review CapEx plans for 2025',
    title_es: 'La corrección del precio del litio obliga a los productores a revisar sus planes de CapEx para 2025',
    source: 'Mining.com',
    source_type: 'Press',
    location: 'Global',
    category: 'Mining',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    url: 'https://www.mining.com/lithium-capex-review-2025/',
    extended_description:
      `A sustained decline in lithium carbonate prices -- now more than 70% below their 2022 peak -- has prompted several major producers, including Albemarle and SQM, to reassess capital expenditure plans for 2025 and beyond. Projects in Chile, Argentina, and Australia face revised timelines as breakeven costs come under scrutiny. The correction reflects a combination of supply overhang from Chinese producers, slower-than-expected EV uptake in Europe, and inventory destocking across the battery supply chain. Industry analysts forecast a market rebalancing in late 2025 if demand accelerates in line with IEA projections.`,
    extended_description_es:
      `Un descenso sostenido en los precios del carbonato de litio --ahora más de un 70% por debajo de su pico de 2022-- ha llevado a varios grandes productores a reevaluar sus planes de gastos de capital. Los proyectos en Chile, Argentina y Australia enfrentan plazos revisados. La corrección refleja una combinación de exceso de oferta de productores chinos y una adopción más lenta de lo esperado de los vehículos eléctricos en Europa.`,
    short_summary: [
      `Lithium prices have fallen over 70% from 2022 peak, triggering CapEx reviews at Albemarle, SQM, and peers.`,
      `Chilean, Argentine, and Australian projects face timeline revisions as breakeven economics tighten.`,
      `IEA demand projections for 2025 could trigger rebalancing if EV adoption accelerates on schedule.`,
    ],
    short_summary_es: [
      `Los precios del litio cayeron más del 70% desde su pico de 2022, provocando revisiones de CapEx.`,
      `Proyectos en Chile, Argentina y Australia enfrentan revisiones de plazos por economías de punto de equilibrio más ajustadas.`,
      `Las proyecciones de demanda de la AIE para 2025 podrían desencadenar un reequilibrio del mercado.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },
  {
    id: 'mock-003',
    title: 'Sernageomin issues new seismic monitoring protocols for open-pit mines in northern Chile',
    title_es: 'Sernageomin emite nuevos protocolos de monitoreo sísmico para minas a cielo abierto en el norte de Chile',
    source: 'Sernageomin',
    source_type: 'Institutional',
    location: 'Chile',
    category: 'Mining',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    url: 'https://www.sernageomin.cl/normas-sismicidad-2024/',
    extended_description:
      `The National Geology and Mining Service of Chile has released updated technical guidelines requiring all open-pit mining operations in the Norte Grande region to upgrade seismic monitoring networks by December 2025. The regulation responds to a series of minor seismic events in 2023 near high-altitude tailings facilities. Operators must install real-time sensor arrays and submit quarterly compliance reports. Non-compliance carries production suspension powers under Article 47 of the Mining Safety Act.`,
    extended_description_es:
      `El Servicio Nacional de Geología y Minería de Chile ha publicado directrices técnicas actualizadas que exigen a todas las operaciones de minería a cielo abierto en la región del Norte Grande actualizar sus redes de monitoreo sísmico antes de diciembre de 2025. La regulación responde a una serie de eventos sísmicos menores en 2023 cerca de instalaciones de relaves de alta altitud.`,
    short_summary: [
      `Sernageomin mandates seismic sensor upgrades for all open-pit mines in Norte Grande by December 2025.`,
      `Regulation follows 2023 minor seismic events near high-altitude tailings facilities in the Atacama region.`,
      `Non-compliant operators face production suspension under Article 47 of the Mining Safety Act.`,
    ],
    short_summary_es: [
      `Sernageomin exige actualización de sensores sísmicos para todas las minas a cielo abierto en Norte Grande antes de diciembre de 2025.`,
      `La regulación sigue a eventos sísmicos menores en 2023 cerca de instalaciones de relaves.`,
      `Los operadores que no cumplan enfrentan suspensión de producción según el Artículo 47 de la Ley de Seguridad Minera.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },

  // ─── Energy ───────────────────────────────────────────────
  {
    id: 'mock-004',
    title: 'IEA: Global clean energy investment to exceed $2 trillion for first time in 2024',
    title_es: 'AIE: La inversión global en energía limpia superará los 2 billones de dólares por primera vez en 2024',
    source: 'IEA',
    source_type: 'Institutional',
    location: 'Global',
    category: 'Energy',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    url: 'https://www.iea.org/news/clean-energy-investment-2024',
    extended_description:
      `The International Energy Agency reports that global clean energy investment is on track to surpass $2 trillion in 2024, with solar and wind accounting for roughly $1.1 trillion of that total. Emerging markets in Latin America and Southeast Asia are showing accelerated growth, driven by declining technology costs and improving financing conditions. The milestone represents a doubling of clean-energy spending in just five years and would align global trajectory with IEA's net-zero scenario for the power sector. Grid infrastructure and storage remain the most under-invested segments relative to what the energy transition requires.`,
    extended_description_es:
      `La Agencia Internacional de Energía informa que la inversión mundial en energía limpia está en camino de superar los 2 billones de dólares en 2024, con la solar y la eólica representando aproximadamente 1,1 billones de ese total. Los mercados emergentes en América Latina y el Sudeste Asiático muestran un crecimiento acelerado. El hito representa una duplicación del gasto en energía limpia en solo cinco años.`,
    short_summary: [
      `Global clean energy investment hits $2 trillion milestone in 2024, led by $1.1 trillion in solar and wind.`,
      `Latin America and Southeast Asia emerge as fastest-growing markets due to lower technology costs.`,
      `Grid infrastructure and storage remain critically underfunded relative to net-zero requirements.`,
    ],
    short_summary_es: [
      `La inversión global en energía limpia alcanza el hito de 2 billones de dólares en 2024, liderada por solar y eólica.`,
      `América Latina y el Sudeste Asiático emergen como los mercados de más rápido crecimiento.`,
      `La infraestructura de redes y el almacenamiento siguen siendo críticamente insuficientes.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },
  {
    id: 'mock-005',
    title: 'Red Eléctrica: Spain reaches 50% renewable electricity share for full year 2024',
    title_es: 'Red Eléctrica: España alcanza el 50% de energía eléctrica renovable en todo el año 2024',
    source: 'Red Eléctrica',
    source_type: 'Institutional',
    location: 'Spain',
    category: 'Energy',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    url: 'https://www.ree.es/es/sala-de-prensa/noticias/2024/renovables-50-anual',
    extended_description:
      `Spain's grid operator Red Eléctrica de España announced that the country generated more than 50% of its electricity from renewable sources over the full calendar year 2024 -- the first time this threshold has been met on an annual basis. Wind power contributed 25%, solar 17%, and hydropower 8% to the renewable total. The achievement puts Spain among the top five European countries by renewable share and strengthens the case for the government's target of 74% renewable generation by 2030.`,
    extended_description_es:
      `El operador de la red española Red Eléctrica de España anunció que el país generó más del 50% de su electricidad a partir de fuentes renovables durante el año natural 2024. La energía eólica contribuyó con el 25%, la solar con el 17% y la hidroeléctrica con el 8% del total renovable. El logro sitúa a España entre los cinco primeros países europeos por cuota renovable.`,
    short_summary: [
      `Spain achieves 50% annual renewable electricity share for the first time, led by wind (25%) and solar (17%).`,
      `Achievement places Spain among Europe\'s top-five nations for renewable energy penetration in 2024.`,
      `Government targets 74% renewable generation by 2030, creating pipeline for additional wind and solar capacity.`,
    ],
    short_summary_es: [
      `España logra por primera vez una cuota anual de electricidad renovable del 50%, liderada por eólica (25%) y solar (17%).`,
      `El logro sitúa a España entre los cinco primeros países de Europa en penetración de energías renovables en 2024.`,
      `El gobierno apunta al 74% de generación renovable para 2030.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },
  {
    id: 'mock-006',
    title: 'BiznesAlert: Poland accelerates offshore wind procurement amid coal phase-out pressure',
    title_es: 'Polonia acelera la contratación eólica offshore ante la presión por abandonar el carbón',
    source: 'BiznesAlert',
    source_type: 'Press',
    location: 'Poland',
    category: 'Energy',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    url: 'https://biznesalert.pl/poland-offshore-wind-2024/',
    extended_description:
      `Poland is fast-tracking its first offshore wind auction, expected to allocate up to 5 GW of capacity in the Baltic Sea, as EU pressure mounts to reduce dependence on coal -- which still accounts for nearly 60% of Polish electricity. The government has earmarked PLN 42 billion in state-backed financing, co-funded through EU Just Transition funds. Orlen, PGE, and international developers including Equinor and Ørsted are all positioned to bid. Grid connectivity remains the principal bottleneck, with PSE requiring significant transmission upgrades along Poland's northern coast.`,
    extended_description_es:
      `Polonia está acelerando su primera subasta eólica marina, que se espera asigne hasta 5 GW de capacidad en el Mar Báltico, mientras la presión de la UE aumenta para reducir la dependencia del carbón, que todavía representa casi el 60% de la electricidad polaca. El gobierno ha reservado 42.000 millones de PLN en financiación respaldada por el Estado.`,
    short_summary: [
      `Poland fast-tracks 5 GW Baltic offshore wind auction backed by PLN 42 billion in state-EU financing.`,
      `Coal still provides ~60% of Polish electricity, making offshore wind critical to EU climate compliance.`,
      `PSE transmission upgrades on the northern coast remain the principal grid bottleneck for project delivery.`,
    ],
    short_summary_es: [
      `Polonia acelera subasta de 5 GW de eólica marina báltica respaldada por 42.000 millones de PLN en financiación estatal y de la UE.`,
      `El carbón aún proporciona ~60% de la electricidad polaca, haciendo que la eólica marina sea crítica.`,
      `Las actualizaciones de transmisión de PSE en la costa norte siguen siendo el principal cuello de botella.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },
  {
    id: 'mock-007',
    title: 'CNE Chile: New electricity tariff update reflects 8% transmission cost reduction',
    title_es: 'CNE Chile: Nueva actualización tarifaria eléctrica refleja una reducción del 8% en costos de transmisión',
    source: 'Comisión Nacional de Energía',
    source_type: 'Institutional',
    location: 'Chile',
    category: 'Energy',
    date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    url: 'https://www.cne.cl/tarifa-transmision-2024',
    extended_description:
      `Chile\'s National Energy Commission published updated transmission tariffs showing a 8% reduction in network access costs, effective from the start of the next regulatory period. The decrease stems from completed investments in the Sistema de Transmisión Nacional and improved load-factor efficiencies. Industrial users, including large mining operations, are expected to benefit most. The CNE also opened a public consultation process for the upcoming 2025-2030 transmission planning cycle.`,
    extended_description_es:
      `La Comisión Nacional de Energía de Chile publicó tarifas de transmisión actualizadas que muestran una reducción del 8% en los costos de acceso a la red. La disminución proviene de las inversiones completadas en el Sistema de Transmisión Nacional y mejoras en la eficiencia del factor de carga. Los usuarios industriales, incluidas las grandes operaciones mineras, serán los más beneficiados.`,
    short_summary: [
      `CNE reduces Chilean electricity transmission tariffs 8% reflecting completed STN investments.`,
      `Large industrial and mining consumers gain the most benefit under the new regulatory period.`,
      `CNE opens public consultation for 2025-2030 transmission planning to map future grid investment.`,
    ],
    short_summary_es: [
      `CNE reduce tarifas de transmisión eléctrica en Chile un 8% por inversiones completadas en el STN.`,
      `Los grandes consumidores industriales y mineros son los más beneficiados en el nuevo período regulatorio.`,
      `CNE abre consulta pública para la planificación de transmisión 2025-2030.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },

  // ─── Data Centers ──────────────────────────────────────────
  {
    id: 'mock-008',
    title: 'Data Center Dynamics: Hyperscalers commit $50B to Latin American DC expansion through 2027',
    title_es: 'Hyperscalers se comprometen a una expansión de centros de datos de 50.000 millones de dólares en Latinoamérica hasta 2027',
    source: 'Data Center Dynamics',
    source_type: 'Press',
    location: 'Global',
    category: 'Data Centers',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    url: 'https://www.datacenterdynamics.com/latam-hyperscaler-expansion-2027/',
    extended_description:
      `Amazon Web Services, Microsoft Azure, and Google Cloud have collectively announced over $50 billion in planned data center investments across Latin America through 2027, with Chile, Brazil, and Mexico as primary deployment markets. The accelerated timeline is driven by AI workload demand, data sovereignty regulations, and improving subsea cable connectivity across the region. Chile is emerging as a preferred hub due to its political stability, renewable energy abundance, and favorable cooling conditions in the Atacama region.`,
    extended_description_es:
      `Amazon Web Services, Microsoft Azure y Google Cloud han anunciado conjuntamente más de 50.000 millones de dólares en inversiones planificadas en centros de datos en América Latina hasta 2027, con Chile, Brasil y México como principales mercados de despliegue. La aceleración está impulsada por la demanda de cargas de trabajo de IA y las regulaciones de soberanía de datos.`,
    short_summary: [
      `AWS, Azure, and Google commit $50 billion to Latin American data center expansion through 2027.`,
      `Chile leads regional appeal due to renewable energy abundance, political stability, and favorable climate.`,
      `AI workload growth and data sovereignty regulations are the primary investment drivers.`,
    ],
    short_summary_es: [
      `AWS, Azure y Google se comprometen con 50.000 millones de dólares en expansión de centros de datos en Latinoamérica hasta 2027.`,
      `Chile lidera el atractivo regional gracias a su abundancia de energía renovable y estabilidad política.`,
      `El crecimiento de cargas de trabajo de IA y las regulaciones de soberanía de datos son los principales impulsores.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },
  {
    id: 'mock-009',
    title: 'TechCrunch: AI data center power demand to triple by 2028, straining grid infrastructure globally',
    title_es: 'La demanda de energía de los centros de datos de IA se triplicará para 2028, tensando la infraestructura de red global',
    source: 'TechCrunch',
    source_type: 'Press',
    location: 'Global',
    category: 'Data Centers',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    url: 'https://techcrunch.com/ai-data-center-power-demand-2028/',
    extended_description:
      `A new Goldman Sachs analysis cited by TechCrunch projects that AI-driven data center electricity consumption will triple between 2024 and 2028, potentially adding 200 GW of new demand to global power grids. This surge is prompting hyperscalers to secure dedicated power purchase agreements with nuclear, hydro, and large-scale solar facilities. Microsoft, Google, and Amazon have each signed landmark nuclear PPAs in recent months. Critics argue the trend could crowd out renewable capacity needed by industrial and residential users and complicate decarbonization timelines.`,
    extended_description_es:
      `Un nuevo análisis de Goldman Sachs proyecta que el consumo de electricidad de los centros de datos impulsados por IA se triplicará entre 2024 y 2028, añadiendo potencialmente 200 GW de nueva demanda a las redes eléctricas globales. Esto está llevando a los hyperscalers a asegurar acuerdos de compra de energía dedicados con instalaciones nucleares, hidráulicas y solares a gran escala.`,
    short_summary: [
      `AI data center power demand projected to triple by 2028, adding 200 GW to global grids per Goldman Sachs.`,
      `Hyperscalers sign nuclear PPAs with Microsoft, Google, and Amazon all committing to dedicated atomic power.`,
      `Critics warn AI electricity growth could crowd out renewable capacity for industrial and residential users.`,
    ],
    short_summary_es: [
      `Se proyecta que la demanda de energía de los centros de datos de IA se triplicará para 2028, añadiendo 200 GW a las redes globales.`,
      `Los hyperscalers firman PPAs nucleares: Microsoft, Google y Amazon se comprometen con energía atómica dedicada.`,
      `Los críticos advierten que el crecimiento de la electricidad de IA podría desplazar la capacidad renovable.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },
  {
    id: 'mock-010',
    title: 'IEA Special Report: Data centres and the global electricity system',
    title_es: 'Informe especial AIE: Los centros de datos y el sistema eléctrico mundial',
    source: 'IEA',
    source_type: 'Institutional',
    location: 'Global',
    category: 'Data Centers',
    date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    url: 'https://www.iea.org/reports/data-centres-and-the-global-electricity-system',
    extended_description:
      `The IEA has released a comprehensive special report analyzing how the explosive growth of data centers -- driven by AI, cloud computing, and cryptocurrency -- is reshaping global electricity systems. The agency estimates data centers consumed 460 TWh globally in 2022, equivalent to the entire electricity consumption of France, and forecasts this could double by 2026. The report calls for mandatory efficiency standards, transparent energy disclosure by operators, and coordinated grid investment to prevent bottlenecks in key markets such as Ireland, Singapore, and the US Mid-Atlantic states.`,
    extended_description_es:
      `La AIE ha publicado un informe especial completo que analiza cómo el crecimiento explosivo de los centros de datos está remodelando los sistemas eléctricos globales. La agencia estima que los centros de datos consumieron 460 TWh globalmente en 2022, equivalente al consumo eléctrico total de Francia, y prevé que esto podría duplicarse para 2026.`,
    short_summary: [
      `IEA estimates data centers consumed 460 TWh globally in 2022, potentially doubling by 2026.`,
      `Agency calls for mandatory efficiency standards and transparent energy disclosure by data center operators.`,
      `Grid bottlenecks already emerging in Ireland, Singapore, and US Mid-Atlantic due to hyperscale expansion.`,
    ],
    short_summary_es: [
      `La AIE estima que los centros de datos consumieron 460 TWh globalmente en 2022, potencialmente duplicándose para 2026.`,
      `La agencia pide estándares de eficiencia obligatorios y divulgación transparente de energía por parte de los operadores.`,
      `Ya surgen cuellos de botella en la red en Irlanda, Singapur y el Mid-Atlantic de EE.UU.`,
    ],
    created_at: new Date().toISOString(),
    processed: true,
  },
]
