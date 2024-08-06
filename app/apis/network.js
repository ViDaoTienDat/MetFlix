import axios from "axios";

const Config = {
  baseURL: "https://api.themoviedb.org/3/movie",
  findURL:'https://api.themoviedb.org/3/search/movie?query=',
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjU2YTA4NGU4MjUzYmE3YWU4YTY1NjNkN2U4N2NiMSIsIm5iZiI6MTcyMjM5NTgwMC41MDc1OTEsInN1YiI6IjY2YTlhYjhlNzU3YTc5MGExYTRkNjIyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gpbxJUA2iwksmWX64yYmmWLyluBBVRUWCuM3Jdy0zK4",
};

export const getUpcomingMoviesApi = async () => {
  try {
    const respone = await axios.get(`${Config.baseURL}/upcoming`,{
        headers:{
            Authorization:`Bearer ${Config.token}`
        }
    });
    const data = respone.data
    const status =respone.status
    return {success:true,data:data,status:status}
  } catch (e) {
    console.log(e);
    return {success:false,data:e}
  }
};
export const getNowPlayingMoviesApi = async () => {
  try {
    const respone = await axios.get(`${Config.baseURL}/now_playing`,{
        headers:{
            Authorization:`Bearer ${Config.token}`
        }
    });
    const data = respone.data
    const status =respone.status
    return {success:true,data:data,status:status}
  } catch (e) {
    console.log(e);
    return {success:false,data:e}
  }
};
export const getPopularMoviesApi = async () => {
  try {
    const respone = await axios.get(`${Config.baseURL}/popular`,{
        headers:{
            Authorization:`Bearer ${Config.token}`
        }
    });
    const data = respone.data
    const status =respone.status
    return {success:true,data:data,status:status}
  } catch (e) {
    console.log(e);
    return {success:false,data:e}
  }
};
export const getTopRatedMoviesApi = async () => {
  try {
    const respone = await axios.get(`${Config.baseURL}/top_rated`,{
        headers:{
            Authorization:`Bearer ${Config.token}`
        }
    });
    const data = respone.data
    const status =respone.status
    return {success:true,data:data,status:status}
  } catch (e) {
    console.log(e);
    return {success:false,data:e}
  }
};
export const findMovieById = async (movieId) => {
  try{
    const respone = await axios.get(`${Config.baseURL}/${movieId}`,{
      headers:{
        Authorization:`Bearer ${Config.token}`
      }
    })
    const data = respone.data
    const status =respone.status

    
    return {success:true,data:data,status:status}
  } catch (e) {
    console.log(e);
    return {success:false,data:e}
  }
}
export const findMovieByName = async (movieName) => {
  try{
    console.log(`Response:${Config.findURL}${movieName}`);
    const respone = await axios.get(`${Config.findURL}${movieName}`,{
      headers:{
        Authorization:`Bearer ${Config.token}`
      }
    })
    const data = respone.data
    const status =respone.status
    return {success:true,data:data,status:status}
  } catch (e) {
    console.log(e);
    return {success:false,data:e}
  }
}
