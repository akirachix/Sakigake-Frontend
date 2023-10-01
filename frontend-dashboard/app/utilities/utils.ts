export const getSignup = async()=>{
    const url = '/api/get-signup';

    try{
        const response = await fetch(url);
        const result = await response.json();
        return result
    }
    catch(error:any){
        return error.message
    }
}


export const getParents = async () => {
    const url = '/api/add_parent';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Error fetching parent data: ' );
    }
};

export const getParent = async()=>{
    const url = '/api/get_parent';

    try{
        const response = await fetch(url);
        const result = await response.json();
        return result
    }
    catch(error:any){
        return error.message
    }

}

interface UsersData {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }
  
  export const createUser = async (userData: UsersData) => {
    const url = `/api/create-user`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
      return result;
    } catch (error: any) {
      return error.message;
    }
  };
