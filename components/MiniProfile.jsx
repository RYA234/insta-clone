
export default function MiniProfile(){
    return(
        <div className="">
            <img 
                className="h-16 rounded-full border p-[2px]"
                src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2710623/profile-images/1655538932"
                alt="user-image"
            />
            
            <div className="flex-1 ml-4">
                <h2 className="font-bold">RYA234</h2>
                <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
            </div>
            <button className="font-semibold text-blue-400 text-sm">Sign out</button>
        </div>
    )
}