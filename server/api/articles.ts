// Get all articles
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const limit = parseInt(query.limit as string) || 10
    const page = parseInt(query.page as string) || 1

    // TODO: Connect to MongoDB and fetch articles
    // const articles = await db.collection('articles')
    //   .find({ status: 'published' })
    //   .sort({ createdAt: -1 })
    //   .limit(limit)
    //   .skip((page - 1) * limit)
    //   .toArray()

    // Mock data
    return {
      articles: [
        {
          _id: '1',
          title: 'Peluncuran Pusat Pembelajaran Wayang Kulit',
          excerpt: 'Kami dengan bangga mengumumkan pembukaan pusat pembelajaran wayang kulit...',
          slug: 'peluncuran-pusat-pembelajaran',
          category: 'pendidikan',
          status: 'published',
          createdAt: new Date('2024-01-15')
        }
      ],
      pagination: {
        page,
        limit,
        total: 1
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching articles'
    })
  }
})
