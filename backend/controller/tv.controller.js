import { fetchFromTmdb } from "../services/tmdb.service.js";

export async function getTrendingTv(req,res){
    try {

        const data = await fetchFromTmdb("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomMovie =  data.results[Math.floor(Math.random()*data.results?.length)];
        res.status(200).json({success:true,content:randomMovie});
        
    } catch (error) {
console.log("Error is in the get trending movie controller",error);
res.status(500).json({message:"internal server error"});        
    }
}

export async function getTvTrailers(req,res){
    const {id}=req.params;
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({success:true,trailers:data.results});
    } catch (error) {
    console.log("error is in the get tv trailers",error);
    res.status(404).json({success:false,message:"internal server error"});        
    }
}

export async function getTvDetails(req,res){
    try {
        const {id} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success:true,content:data});
    } catch (error) {
        console.log("error is in the get tv details controller",error);
        res.status(404).json({success:false,message:"internal server error"});
        
    }
}

export async function getSimilarTvs(req,res){
    try {

        const{id}=req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`);
        res.status(200).json({success:true,similar:data});
        
    } catch (error) {
        console.log("error is in the  get similar tvs",error);
        res.status(404).json({success:false,message:"internal server error"});
        
    }
}

export async function getTvsByCategory(req,res){
    try {

        const {category} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.status(200).json({success:true,content:data.results});


        
    } catch (error) {
        console.log("error is in the get tvs by category controller",error);
        res.status(404).json({success:false,message:"no such category found"});
        
    }
}