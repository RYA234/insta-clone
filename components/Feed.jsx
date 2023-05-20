import Posts from "./Posts";
import Stories from "./Stories";


export default function Feed(){
    return(
        <main>
            <section>
                <Stories/>

                <Posts />
            </section>

            <section>

            </section>
        </main>
    )
}