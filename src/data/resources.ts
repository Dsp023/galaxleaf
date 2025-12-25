export type ResourceType = "Tool" | "Course" | "Concept";

export interface Tool {
    name: string;
    url?: string;
    description?: string;
    type?: ResourceType; // Optional, defaults to "Tool"
    icon?: string; // Optional emoji or icon for display
    iconUrl?: string; // Optional URL to fetch favicon from (if different from url)
}

export interface Category {
    name: string;
    tools: Tool[];
}

export interface Domain {
    name: string;
    description: string;
    categories: Category[];
}

export const techStack: Domain[] = [
    {
        name: "🧠 AI & LLMs",
        description: "The intelligence layer.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "Neural Networks", url: "/wiki/neural-networks", description: "Computing systems inspired by biological neural networks.", type: "Concept", icon: "🧠" },
                    { name: "Transformers", url: "/wiki/transformers", description: "Deep learning model based on attention mechanisms.", type: "Concept" },
                    { name: "Backpropagation", url: "/wiki/backpropagation", description: "Algorithm for training neural networks.", type: "Concept" },
                    { name: "Reinforcement Learning (RLHF)", url: "/wiki/rlhf", description: "Training models with human feedback.", type: "Concept" },
                    { name: "Embeddings", url: "/wiki/embeddings", description: "Vector representations of data.", type: "Concept" },
                    { name: "Attention Mechanism", url: "/wiki/attention", description: "How models focus on specific parts of input.", type: "Concept" },
                ]
            },
            {
                name: "Machine Learning & Deep Learning",
                tools: [
                    { name: "Python", url: "https://www.python.org", description: "High-level programming language for AI/ML" },
                    { name: "NumPy", url: "https://numpy.org/" },
                    { name: "Pandas", url: "https://pandas.pydata.org/" },
                    { name: "Scikit-learn", url: "https://scikit-learn.org/" },
                    { name: "PyTorch", url: "https://pytorch.org/" },
                    { name: "TensorFlow", url: "https://www.tensorflow.org/" },
                    { name: "Jupyter", url: "https://jupyter.org/" },
                    { name: "Keras", url: "https://keras.io/" },
                ]
            },
            {
                name: "Generative Media (Image/Video/Audio)",
                tools: [
                    { name: "Midjourney", url: "https://www.midjourney.com/" },
                    { name: "Stable Diffusion", url: "https://stability.ai/" },
                    { name: "Runway", url: "https://runwayml.com/" },
                    { name: "ElevenLabs", url: "https://elevenlabs.io/", description: "AI Voice generation." },
                    { name: "Sora", url: "https://openai.com/sora" },
                ]
            },
            {
                name: "Prompt Engineering",
                tools: [
                    { name: "Zero-shot / Few-shot", url: "/wiki/zero-shot-few-shot", description: "Prompting techniques without training.", type: "Concept" },
                    { name: "Chain of Thought", url: "/wiki/chain-of-thought", description: "Prompting for step-by-step reasoning.", type: "Concept" },
                    { name: "PromptLayer", url: "https://promptlayer.com/" },
                    { name: "Helicone", url: "https://www.helicone.ai/" },
                    { name: "Pezzo", url: "https://github.com/pezzolabs/pezzo" },
                    { name: "Microsoft Prompt Flow", url: "https://microsoft.github.io/promptflow/" },
                ]
            },
            {
                name: "LLM Frameworks",
                tools: [
                    { name: "Hugging Face Transformers", url: "https://huggingface.co/docs/transformers" },
                    { name: "LangChain", url: "https://www.langchain.com/" },
                    { name: "LlamaIndex", url: "https://www.llamaindex.ai/" },
                    { name: "Haystack", url: "https://haystack.deepset.ai/" },
                    { name: "DSPy", url: "https://github.com/stanfordnlp/dspy", description: "Programming—not prompting—language models." },
                ]
            },
            {
                name: "Model Providers",
                tools: [
                    { name: "OpenAI", url: "https://platform.openai.com/" },
                    { name: "Anthropic", url: "https://www.anthropic.com/" },
                    { name: "Google Gemini", url: "https://ai.google.dev/" },
                    { name: "Groq", url: "https://groq.com/" },
                    { name: "Mistral", url: "https://mistral.ai/" },
                    { name: "Cohere", url: "https://cohere.com/" },
                    { name: "Ollama", url: "https://ollama.com/", description: "Run LLMs locally." },
                ]
            },
            {
                name: "Embeddings & RAG",
                tools: [
                    { name: "Vector Search", url: "/wiki/vector-search", description: "Searching by semantic meaning.", type: "Concept" },
                    { name: "RAG", url: "/wiki/rag", description: "Retrieval-Augmented Generation.", type: "Concept" },
                    { name: "Sentence Transformers", url: "https://www.sbert.net/" },
                    { name: "FAISS", url: "https://github.com/facebookresearch/faiss" },
                    { name: "Chroma", url: "https://www.trychroma.com/" },
                    { name: "Weaviate", url: "https://weaviate.io/" },
                    { name: "Pinecone", url: "https://www.pinecone.io/" },
                    { name: "Milvus", url: "https://milvus.io/" },
                    { name: "Qdrant", url: "https://qdrant.tech/" },
                ]
            },
            {
                name: "Agents & Orchestration",
                tools: [
                    { name: "ReAct Pattern", url: "/wiki/react-pattern", description: "Reasoning and Acting pattern for agents.", type: "Concept" },
                    { name: "LangGraph", url: "https://langchain-ai.github.io/langgraph/" },
                    { name: "AutoGen", url: "https://microsoft.github.io/autogen/" },
                    { name: "CrewAI", url: "https://www.crewai.com/" },
                    { name: "OpenAI Assistants API", url: "https://platform.openai.com/docs/assistants/overview" },
                ]
            },
            {
                name: "Evaluation & Observability",
                tools: [
                    { name: "LangSmith", url: "https://smith.langchain.com/" },
                    { name: "Weights & Biases", url: "https://wandb.ai/" },
                    { name: "Promptfoo", url: "https://www.promptfoo.dev/" },
                    { name: "TruLens", url: "https://www.trulens.org/" },
                    { name: "OpenTelemetry", url: "https://opentelemetry.io/" },
                    { name: "Arize Phoenix", url: "https://arize.com/phoenix/" },
                ]
            },
            {
                name: "Fine-tuning & Optimization",
                tools: [
                    { name: "Quantization", url: "/wiki/quantization", description: "Reducing precision of model weights.", type: "Concept" },
                    { name: "LoRA / QLoRA", url: "https://huggingface.co/docs/peft" },
                    { name: "PEFT", url: "https://github.com/huggingface/peft" },
                    { name: "BitsAndBytes", url: "https://github.com/TimDettmers/bitsandbytes" },
                    { name: "DeepSpeed", url: "https://www.deepspeed.ai/" },
                    { name: "Axolotl", url: "https://github.com/OpenAccess-AI-Collective/axolotl", description: "Go-to tool for fine-tuning Llama models." },
                ]
            },
            {
                name: "Deployment & Serving",
                tools: [
                    { name: "vLLM", url: "https://vllm.ai/" },
                    { name: "TGI", url: "https://huggingface.co/docs/text-generation-inference" },
                    { name: "Triton Inference Server", url: "https://developer.nvidia.com/triton-inference-server" },
                    { name: "LocalAI", url: "https://localai.io/" },
                ]
            }
        ]
    },
    {
        name: "🎨 Frontend",
        description: "Building the visual web.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "DOM", url: "/wiki/dom", description: "Document Object Model.", type: "Concept" },
                    { name: "Virtual DOM", url: "/wiki/virtual-dom", description: "React's efficient DOM abstraction.", type: "Concept" },
                    { name: "Event Loop", url: "/wiki/event-loop", description: "How JS uses call stack and task queue.", type: "Concept" },
                    { name: "CSR vs SSR vs ISR", url: "/wiki/rendering-patterns", description: "Rendering strategies (Client, Server, Static).", type: "Concept" },
                    { name: "Hydration", url: "/wiki/hydration", description: "Attaching event listeners to server-rendered HTML.", type: "Concept" },
                    { name: "WebAssembly (Wasm)", url: "/wiki/wasm", description: "Running binary code in the browser.", type: "Concept" },
                ]
            },
            {
                name: "Core",
                tools: [
                    { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                    { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                    { name: "JavaScript (ES6+)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                    { name: "TypeScript", url: "https://www.typescriptlang.org/" },
                ]
            },
            {
                name: "Package Managers",
                tools: [
                    { name: "npm", url: "https://www.npmjs.com/" },
                    { name: "yarn", url: "https://yarnpkg.com/" },
                    { name: "pnpm", url: "https://pnpm.io/" },
                ]
            },
            {
                name: "Frameworks",
                tools: [
                    { name: "Next.js", url: "https://nextjs.org/" },
                    { name: "React", url: "https://react.dev/" },
                    { name: "Angular", url: "https://angular.io/" },
                    { name: "Vue", url: "https://vuejs.org/" },
                    { name: "Svelte / SvelteKit", url: "https://svelte.dev/" },
                    { name: "Astro", url: "https://astro.build/" },
                ]
            },
            {
                name: "Styling",
                tools: [
                    { name: "Box Model", url: "/wiki/box-model", description: "CSS layout foundation.", type: "Concept" },
                    { name: "Flexbox & Grid", url: "/wiki/flexbox-grid", description: "Modern CSS layout systems.", type: "Concept" },
                    { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
                    { name: "CSS Modules", url: "https://github.com/css-modules/css-modules" },
                    { name: "Styled Components", url: "https://styled-components.com/" },
                    { name: "Shadcn UI", url: "https://ui.shadcn.com/" },
                    { name: "Radix UI", url: "https://www.radix-ui.com/" },
                ]
            },
            {
                name: "Build Tools",
                tools: [
                    { name: "Vite", url: "https://vitejs.dev/" },
                    { name: "Webpack", url: "https://webpack.js.org/" },
                    { name: "Turbopack", url: "https://turbo.build/pack" },
                    { name: "Bun", url: "https://bun.sh/" },
                    { name: "Rspack", url: "https://www.rspack.dev/" },
                ]
            },
            {
                name: "State & Data",
                tools: [
                    { name: "Redux Toolkit", url: "https://redux-toolkit.js.org/" },
                    { name: "Zustand", url: "https://github.com/pmndrs/zustand" },
                    { name: "React Query (TanStack)", url: "https://tanstack.com/query/latest" },
                    { name: "SWR", url: "https://swr.vercel.app/" },
                    { name: "Jotai", url: "https://jotai.org/" },
                ]
            },
            {
                name: "Animations & UX",
                tools: [
                    { name: "Framer Motion", url: "https://www.framer.com/motion/" },
                    { name: "GSAP", url: "https://greensock.com/gsap/" },
                    { name: "Lottie", url: "https://airbnb.io/lottie/" },
                ]
            },
            {
                name: "AI-specific UI",
                tools: [
                    { name: "Vercel AI SDK", url: "https://sdk.vercel.ai/docs" },
                    { name: "React Markdown", url: "https://github.com/remarkjs/react-markdown" },
                    { name: "Monaco Editor", url: "https://microsoft.github.io/monaco-editor/" },
                ]
            }
        ]
    },
    {
        name: "⚙️ Backend",
        description: "The engine room.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "ACID", url: "/wiki/acid", description: "Atomicity, Consistency, Isolation, Durability.", type: "Concept" },
                    { name: "CAP Theorem", url: "/wiki/cap-theorem", description: "Consistency, Availability, Partition Tolerance trade-offs.", type: "Concept" },
                    { name: "REST vs GraphQL", url: "/wiki/rest-graphql", description: "API architectural styles.", type: "Concept" },
                    { name: "Microservices", url: "/wiki/microservices", description: "Architectural style structuring an app as services collection.", type: "Concept" },
                    { name: "Horizontal vs Vertical Scaling", url: "/wiki/scaling", description: "Strategies for handling load.", type: "Concept" },
                    { name: "Serverless", url: "/wiki/serverless", description: "Running code without managing servers.", type: "Concept" },
                ]
            },
            {
                name: "Languages",
                tools: [
                    { name: "Node.js", url: "https://nodejs.org/" },
                    { name: "Go (Golang)", url: "https://go.dev/" },
                    { name: "Python", url: "https://www.python.org/" },
                    { name: "Java", url: "https://www.java.com/" },
                    { name: "Rust", url: "https://www.rust-lang.org/" },
                    { name: "Elixir", url: "https://elixir-lang.org/" },
                ]
            },
            {
                name: "Frameworks",
                tools: [
                    { name: "FastAPI", url: "https://fastapi.tiangolo.com/" },
                    { name: "Flask", url: "https://flask.palletsprojects.com/" },
                    { name: "Express.js", url: "https://expressjs.com/" },
                    { name: "NestJS", url: "https://nestjs.com/" },
                    { name: "Spring Boot", url: "https://spring.io/projects/spring-boot" },
                    { name: "Hono", url: "https://hono.dev/", description: "Ultrafast web framework for Edge." },
                ]
            },
            {
                name: "Authentication & Identity",
                tools: [
                    { name: "Auth0", url: "https://auth0.com/" },
                    { name: "Clerk", url: "https://clerk.com/" },
                    { name: "Supabase Auth", url: "https://supabase.com/auth" },
                    { name: "NextAuth.js (Auth.js)", url: "https://next-auth.js.org/" },
                ]
            },
            {
                name: "Databases",
                tools: [
                    { name: "SQL vs NoSQL", url: "/wiki/sql-nosql", description: "Relational vs Non-relational databases.", type: "Concept" },
                    { name: "Sharding", url: "/wiki/sharding", description: "Horizontal partitioning of data.", type: "Concept" },
                    { name: "PostgreSQL", url: "https://www.postgresql.org/" },
                    { name: "MySQL", url: "https://www.mysql.com/" },
                    { name: "MongoDB", url: "https://www.mongodb.com/" },
                    { name: "Redis", url: "https://redis.io/" },
                    { name: "Elasticsearch", url: "https://www.elastic.co/" },
                    { name: "Supabase", url: "https://supabase.com/", description: "Open source Firebase alternative (Postgres)." },
                ]
            },
            {
                name: "APIs & Communication",
                tools: [
                    { name: "REST", url: "https://restfulapi.net/" },
                    { name: "GraphQL", url: "https://graphql.org/" },
                    { name: "gRPC", url: "https://grpc.io/" },
                    { name: "WebSockets", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
                    { name: "tRPC", url: "https://trpc.io/", description: "End-to-end typesafe APIs." },
                ]
            },
            {
                name: "AI Backends & Queues",
                tools: [
                    { name: "Celery", url: "https://docs.celeryq.dev/" },
                    { name: "BullMQ", url: "https://docs.bullmq.io/" },
                    { name: "RabbitMQ", url: "https://www.rabbitmq.com/" },
                    { name: "Kafka", url: "https://kafka.apache.org/" },
                ]
            }
        ]
    },
    {
        name: "☁️ DevOps",
        description: "Shipping and scaling.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "CI/CD", url: "/wiki/cicd", description: "Continuous Integration & Deployment.", type: "Concept" },
                    { name: "Infrastructure as Code (IaC)", url: "/wiki/iac", description: "Managing infra through config files.", type: "Concept" },
                    { name: "Containerization", url: "/wiki/containerization", description: "Package software with dependencies.", type: "Concept" },
                    { name: "Orchestration", url: "/wiki/orchestration", description: "Managing container lifecycles.", type: "Concept" },
                    { name: "Observability", url: "/wiki/observability", description: "Logs, Metrics, Traces.", type: "Concept" },
                ]
            },
            {
                name: "OS & Networking",
                tools: [
                    { name: "Linux", url: "https://www.kernel.org/" },
                    { name: "Nginx", url: "https://nginx.org/" },
                    { name: "Caddy", url: "https://caddyserver.com/", description: "Secure by default web server." },
                ]
            },
            {
                name: "Containers & Infra",
                tools: [
                    { name: "Docker", url: "https://www.docker.com/" },
                    { name: "Kubernetes", url: "https://kubernetes.io/" },
                    { name: "Helm", url: "https://helm.sh/" },
                    { name: "Terraform", url: "https://www.terraform.io/", description: "Infrastructure as Code tool." },
                    { name: "Ansible", url: "https://www.ansible.com/" },
                ]
            },
            {
                name: "CI/CD",
                tools: [
                    { name: "GitHub Actions", url: "https://github.com/features/actions" },
                    { name: "GitLab CI", url: "https://docs.gitlab.com/ee/ci/" },
                    { name: "Jenkins", url: "https://jenkins.io/" },
                    { name: "CircleCI", url: "https://circleci.com/" },
                ]
            },
            {
                name: "Cloud & Serverless",
                tools: [
                    { name: "AWS", url: "https://aws.amazon.com/" },
                    { name: "GCP", url: "https://cloud.google.com/" },
                    { name: "Azure", url: "https://azure.microsoft.com/" },
                    { name: "Vercel", url: "https://vercel.com/" },
                    { name: "Fly.io", url: "https://fly.io/" },
                    { name: "Cloudflare Workers", url: "https://workers.cloudflare.com/" },
                ]
            },
            {
                name: "Monitoring",
                tools: [
                    { name: "Prometheus", url: "https://prometheus.io/" },
                    { name: "Grafana", url: "https://grafana.com/" },
                    { name: "Loki", url: "https://grafana.com/oss/loki/" },
                    { name: "Datadog", url: "https://www.datadoghq.com/" },
                    { name: "Sentry", url: "https://sentry.io/" },
                ]
            },
            {
                name: "AI Infra",
                tools: [
                    { name: "Ray", url: "https://www.ray.io/" },
                    { name: "KServe", url: "https://kserve.github.io/website/" },
                    { name: "BentoML", url: "https://www.bentoml.com/" },
                    { name: "Modal", url: "https://modal.com/", description: "End-to-end cloud for AI/ML." },
                ]
            }
        ]
    },
    {
        name: "🎨 Design",
        description: "Crafting the experience.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "Color Theory", url: "/wiki/color-theory", description: "Harmony, contrast, and psychology.", type: "Concept" },
                    { name: "Typography", url: "/wiki/typography", description: "Fonts, hierarchy, and readability.", type: "Concept" },
                    { name: "Accessibility (a11y)", url: "/wiki/accessibility", description: "Designing for all capabilities.", type: "Concept" },
                    { name: "User Centered Design", url: "/wiki/ucd", description: "Optimizing for user needs.", type: "Concept" },
                ]
            },
            {
                name: "UI / UX Tools",
                tools: [
                    { name: "Figma", url: "https://www.figma.com/" },
                    { name: "Adobe XD", url: "https://helpx.adobe.com/xd/get-started.html" },
                    { name: "Penpot", url: "https://penpot.app/", description: "Open source design tool." },
                ]
            },
            {
                name: "Design Systems",
                tools: [
                    { name: "Material UI", url: "https://mui.com/" },
                    { name: "Ant Design", url: "https://ant.design/" },
                    { name: "Chakra UI", url: "https://chakra-ui.com/" },
                    { name: "Mantine", url: "https://mantine.dev/" },
                ]
            },
            {
                name: "AI Product Design",
                tools: [
                    { name: "Google PAIR", url: "https://pair.withgoogle.com/" },
                    { name: "Galileo AI", url: "https://www.usegalileo.ai/" },
                ]
            }
        ]
    },
    {
        name: "📱 Mobile & PWA",
        description: "Apps for every device.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "PWA", url: "/wiki/pwa", description: "Progressive Web Apps.", type: "Concept" },
                    { name: "React Native Bridge/JSI", url: "/wiki/rn-bridge", description: "Communication between JS and Native.", type: "Concept" },
                    { name: "Native Modules", url: "/wiki/native-modules", description: "Accessing platform APIs.", type: "Concept" },
                ]
            },
            {
                name: "Cross-Platform Frameworks",
                tools: [
                    { name: "React Native", url: "https://reactnative.dev/" },
                    { name: "Flutter", url: "https://flutter.dev/" },
                    { name: "Expo", url: "https://expo.dev/" },
                    { name: "Ionic", url: "https://ionicframework.com/" },
                    { name: "Tauri", url: "https://tauri.app/", description: "Build smaller, faster, and more secure desktop apps." },
                ]
            },
            {
                name: "Native Development",
                tools: [
                    { name: "Swift (iOS)", url: "https://developer.apple.com/swift/" },
                    { name: "Kotlin (Android)", url: "https://kotlinlang.org/" },
                    { name: "SwiftUI", url: "https://developer.apple.com/xcode/swiftui/" },
                    { name: "Jetpack Compose", url: "https://developer.android.com/jetpack/compose" },
                ]
            }
        ]
    },
    {
        name: "📊 Data Engineering",
        description: "Big data pipelines and analytics.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "ETL vs ELT", url: "/wiki/etl-elt", description: "Extract-Transform-Load strategies.", type: "Concept" },
                    { name: "Data Lake vs Warehouse", url: "/wiki/data-lake-warehouse", description: "Storage architectures.", type: "Concept" },
                    { name: "Batch vs Streaming", url: "/wiki/batch-streaming", description: "Data processing paradigms.", type: "Concept" },
                ]
            },
            {
                name: "Processing & ETL",
                tools: [
                    { name: "Apache Spark", url: "https://spark.apache.org/" },
                    { name: "Apache Airflow", url: "https://airflow.apache.org/" },
                    { name: "dbt", url: "https://www.getdbt.com/" },
                    { name: "Kafka", url: "https://kafka.apache.org/" },
                    { name: "Flink", url: "https://flink.apache.org/" },
                ]
            },
            {
                name: "Warehousing",
                tools: [
                    { name: "Snowflake", url: "https://www.snowflake.com/" },
                    { name: "Databricks", url: "https://www.databricks.com/" },
                    { name: "BigQuery", url: "https://cloud.google.com/bigquery" },
                    { name: "DuckDB", url: "https://duckdb.org/", description: "In-process SQL OLAP database." },
                ]
            }
        ]
    },
    {
        name: "⛓️ Web3 & Blockchain",
        description: "Decentralized future.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "Blockchain", url: "/wiki/blockchain", description: "Distributed ledger technology.", type: "Concept" },
                    { name: "Smart Contracts", url: "/wiki/smart-contracts", description: "Self-executing code on chain.", type: "Concept" },
                    { name: "Consensus Mechanisms", url: "/wiki/consensus", description: "PoW, PoS, etc.", type: "Concept" },
                    { name: "Zero Knowledge Proofs", url: "/wiki/zkp", description: "Proving knowledge without revealing it.", type: "Concept" },
                ]
            },
            {
                name: "Core Protocols",
                tools: [
                    { name: "Ethereum", url: "https://ethereum.org/" },
                    { name: "Solana", url: "https://solana.com/" },
                    { name: "Bitcoin", url: "https://bitcoin.org/" },
                ]
            },
            {
                name: "Development",
                tools: [
                    { name: "Solidity", url: "https://soliditylang.org/" },
                    { name: "Hardhat", url: "https://hardhat.org/" },
                    { name: "Ethers.js", url: "https://docs.ethers.org/v5/" },
                    { name: "Viem", url: "https://viem.sh/", description: "TypeScript interface for Ethereum." },
                    { name: "IPFS", url: "https://ipfs.tech/" },
                ]
            }
        ]
    },
    {
        name: "🎮 Game Development",
        description: "Interactive 3D worlds.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "Game Loop", url: "/wiki/game-loop", description: "Update-Render cycle.", type: "Concept" },
                    { name: "ECS", url: "/wiki/ecs", description: "Entity Component System architecture.", type: "Concept" },
                    { name: "Shaders", url: "/wiki/shaders", description: "Programs running on GPU.", type: "Concept" },
                    { name: "Raycasting", url: "/wiki/raycasting", description: "Calculating line-of-sight.", type: "Concept" },
                ]
            },
            {
                name: "Engines",
                tools: [
                    { name: "Unity", url: "https://unity.com/" },
                    { name: "Unreal Engine", url: "https://www.unrealengine.com/" },
                    { name: "Godot", url: "https://godotengine.org/" },
                    { name: "Three.js", url: "https://threejs.org/" },
                    { name: "React Three Fiber", url: "https://docs.pmnd.rs/react-three-fiber" },
                ]
            },
            {
                name: "Assets & Modeling",
                tools: [
                    { name: "Blender", url: "https://www.blender.org/" },
                    { name: "Spline", url: "https://spline.design/" },
                ]
            }
        ]
    },
    {
        name: "🛡️ Cybersecurity",
        description: "Protecting the stack.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "CIA Triad", url: "/wiki/cia-triad", description: "Confidentiality, Integrity, Availability.", type: "Concept" },
                    { name: "Zero Trust", url: "/wiki/zero-trust", description: "Never trust, always verify.", type: "Concept" },
                    { name: "Encryption", url: "/wiki/encryption", description: "Symmetric vs Asymmetric.", type: "Concept" },
                    { name: "Social Engineering", url: "/wiki/social-engineering", description: "Psychological manipulation.", type: "Concept" },
                ]
            },
            {
                name: "Analysis & Pentesting",
                tools: [
                    { name: "Kali Linux", url: "https://www.kali.org/" },
                    { name: "Metasploit", url: "https://www.metasploit.com/" },
                    { name: "Wireshark", url: "https://www.wireshark.org/" },
                    { name: "Burp Suite", url: "https://portswigger.net/burp" },
                ]
            },
            {
                name: "Reverse Engineering",
                tools: [
                    { name: "Ghidra", url: "https://ghidra-sre.org/" },
                    { name: "IDA Pro", url: "https://hex-rays.com/ida-pro/" },
                ]
            }
        ]
    },
    {
        name: "🧩 Cross-Cutting",
        description: "Foundations.",
        categories: [
            {
                name: "Core Concepts",
                tools: [
                    { name: "Algorithms", url: "/wiki/algorithms", description: "Sorting, Searching, Graph traversal.", type: "Concept" },
                    { name: "Data Structures", url: "/wiki/data-structures", description: "Arrays, Trees, Hash Maps.", type: "Concept" },
                    { name: "Design Patterns", url: "/wiki/design-patterns", description: "Singleton, Factory, Observer.", type: "Concept" },
                    { name: "Big O Notation", url: "/wiki/big-o", description: "Time and Space complexity.", type: "Concept" },
                ]
            },
            {
                name: "IDEs & Editors",
                tools: [
                    { name: "VS Code", url: "https://code.visualstudio.com/" },
                    { name: "Cursor", url: "https://cursor.sh/", description: "AI-first code editor." },
                    { name: "JetBrains (IntelliJ/WebStorm)", url: "https://www.jetbrains.com/" },
                ]
            },
            {
                name: "Version Control",
                tools: [
                    { name: "Git", url: "https://git-scm.com/" },
                    { name: "GitHub", url: "https://github.com/" },
                    { name: "GitLab", url: "https://about.gitlab.com/" },
                ]
            },
            {
                name: "Testing",
                tools: [
                    { name: "Jest", url: "https://jestjs.io/" },
                    { name: "Playwright", url: "https://playwright.dev/" },
                    { name: "Cypress", url: "https://www.cypress.io/" },
                    { name: "Vitest", url: "https://vitest.dev/", description: "Blazing fast unit test framework." },
                ]
            },
            {
                name: "Security",
                tools: [
                    { name: "OAuth2", url: "https://oauth.net/2/" },
                    { name: "JWT", url: "https://jwt.io/" },
                    { name: "OWASP", url: "https://owasp.org/" },
                ]
            }
        ]
    },
];