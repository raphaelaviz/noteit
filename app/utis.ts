'use server'

//////////////////////////////////////////////
export const deleteAssistance = async (assistanceId: string, categoryId: string | null) => {
  'use server'
    try {
      const deleteResponse = await fetch(`${process.env.API_ENDPOINT}/${assistanceId}`, {
        method: 'DELETE',
      })
  
      if (!deleteResponse.ok) {
        console.error('Failed to delete assistance')
        return
      }
  
      const categoryResponse = await fetch(`${process.env.API2_ENDPOINT}/${categoryId}`,
        {
          method: 'GET',
        },
      )
  
      if (!categoryResponse.ok) {
        console.error('Failed to fetch category')
        return
      }
  
      const category = await categoryResponse.json()
  
      return {
        categoryIsEmpty: category.Assistance.length === 0,
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

//////////////////////////////////////////////
export const deleteCategory = async (categoryId: string | null) => {
  'use server'
  try {
    const response = await fetch(`${process.env.API2_ENDPOINT}/${categoryId}`, {
      method: 'DELETE',
    })

    return response.ok
  } catch (error) {
    console.error('Error:', error)
  }
}
//////////////////////////////////////////////
export const createCategory = async (name: string, color: string, userId: string) => {
  'use server'

  try {
    const response = await fetch(`${process.env.API4_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color, userId: userId }),
    })
  
    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
//////////////////////////////////////////////
export const createAssistance = async (name: string, categoryId: string, userId: string) => {
  'use server'
  
  try {
    const response = await fetch(`${process.env.API3_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, categoryId, userId: userId }),
    })  
    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
///////////////////////////////
export const updateAssistance = async (assistanceId: string, editorContent: any) => {
  'use server'
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/${assistanceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: assistanceId,
        editorContent,
      }),
    })

    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
