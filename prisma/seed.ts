import { PrismaClient } from '@prisma/client'
import { techStack } from '../src/data/resources'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    // Optional: Clear existing data
    await prisma.resource.deleteMany()
    console.log('Deleted existing resources.')

    let count = 0;

    for (const domain of techStack) {
        for (const category of domain.categories) {
            for (const tool of category.tools) {
                await prisma.resource.create({
                    data: {
                        name: tool.name,
                        description: tool.description || '',
                        url: tool.url || '',
                        category: category.name,
                        domain: domain.name,
                        status: "APPROVED",
                        // Icon handling: we might need to store icon name or URL?
                        // Schema doesn't have icon field.
                        // Let's update schema? Or just ignore for now?
                        // Schema check: name, description, url, category, domain, status, submittedBy, timestamps.
                        // We lose icon info.
                        // Let's add 'icon' and 'iconUrl' to schema to be safe.
                    }
                })
                count++
            }
        }
    }

    console.log(`Seeded ${count} resources.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
