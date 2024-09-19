exports.postData = async(url: string = '', data: any = {}) =>{
    try {
      const response : any = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      // Check if the response was successful
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        throw new Error(message);
      }
  
      const responseData = await response.json(); // Parse JSON data from the response
      return responseData; // Return the data from the response
    } catch (error) {
      console.error('Error:', error);
    }
  }