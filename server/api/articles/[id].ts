// POST: Create new article
// PUT: Update article
// GET: Get article by slug

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const { id } = event.context.params

  try {
    if (method === 'GET') {
      // Get article by ID or slug
      // const article = await db.collection('articles')
      //   .findOne({ $or: [{ _id: id }, { slug: id }] })

      // Mock data
      return {
        _id: '1',
        title: 'Peluncuran Pusat Pembelajaran Wayang Kulit',
        excerpt: 'Kami dengan bangga mengumumkan pembukaan pusat pembelajaran wayang kulit...',
        slug: 'peluncuran-pusat-pembelajaran',
        category: 'pendidikan',
        content: '<p>Detailed content here...</p>',
        status: 'published',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      }
    }

    if (method === 'PUT') {
      // Update article - requires authentication
      // const body = await readBody(event)
      // const result = await db.collection('articles')
      //   .updateOne({ _id: id }, { $set: body })

      return { success: true, message: 'Article updated' }
    }

    if (method === 'DELETE') {
      // Delete article - requires authentication
      // const result = await db.collection('articles')
      //   .deleteOne({ _id: id })

      return { success: true, message: 'Article deleted' }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error processing article'
    })
  }
})
