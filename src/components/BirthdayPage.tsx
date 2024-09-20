import React, {useMemo, useState} from "react";
import vigenereTable from "../vigenereTable.jpg"

interface birthdayData {
    riddle?: string,
    bookName?: string,
    pagePuzzle?: string
    vigenereLink?: string
    vigenereImage?: string
}

const Riddles: birthdayData[] = [
    {
        riddle: 'Küçük bir Ada, kitaplarla dolu, okumak için gidersin oraya.\n' +
            ' Neresi burası, bir an önce koyul yola.',
    },
    {
        bookName: "Kendime Düşünceler - Marcus Aurelius",
        riddle: 'Bir yaprak fısıldar, bir çizgi bekler, bir harf parlar geceden,\n' +
            'Üç sayının rehberliğinde çözersen bulursun gerçeği derinden.',
        pagePuzzle: '26-9-12\n' +
            '31-10-13\n' +
            '44-15-34\n' +
            '56-1-2\n' +
            '65-22-28\n' +
            '72-16-14\n' +
            '73-20-1\n' +
            '88-4-12\n'
    },
    {
        vigenereLink: 'https://en.wikipedia.org/wiki/Blaise_de_Vigen%C3%A8re',
        vigenereImage: '../vigenereTable.jpg'
    }
]

const BirthdayPage: React.FC = () => {


   const [page, setPage] = useState<number>(0);


    const PageRenderer = useMemo(() => {
        return (
            <div className="flex items-center justify-center min-h-screen ">
                <div className="w-[90%] sm:w-[700px] h-[80%] sm:h-[600px] shadow-lg bg-gray-100 flex flex-col justify-between  rounded-[3px]">
                    <div className={'w-[700px] h-[300px] '}>
                        {page === 0 && (
                            <div className={'w-[700px] h-[500px] flex flex-col justify-center items-center pl-10'}>
                                <h1 className={' text-xl font-bold tracking-wide whitespace-pre-line'}>{Riddles[0].riddle}</h1>
                            </div>
                        )}
                        {page === 1 && (
                            <div className={'w-[700px] h-[500px] flex flex-col gap-5 justify-center items-center p-10'}>
                                <h1 className={'text-xl font-bold tracking-wide whitespace-pre-line'}>{Riddles[1].riddle}</h1>
                                <p className={'text-sm font-bold tracking-wide'}>{Riddles[1].bookName}</p>
                                <p className={'text-sm font-bold tracking-wide whitespace-pre-line'}>
                                    {Riddles[1].pagePuzzle}
                                </p></div>
                        )}
                        {page === 2 && (
                            <div className={'w-[700px] h-[500px] flex flex-col gap-5 justify-center items-center p-10'}>
                                <a href={Riddles[2].vigenereLink} target={"_blank"}
                                   className="text-blue-600 underline text-sm font-bold tracking-wide">
                                    {'Hmmm Bu ne olabilir?'}
                                </a>
                                <img src={vigenereTable} alt={'Vigenere Table'} className={'w-[500px] h-[500px]'} />
                            </div>
                        )}
                    </div>
                    <div className={'w-[700px] h-[100px] p-2 flex flex-row justify-between items-center'}>
                        <button
                            className={'w-[70px] h-[50px] bg-blue-700 active:bg-blue-400 rounded-[3px] text-white font-bold'}
                            onClick={() => {
                                if(page > 0)
                                 setPage(page - 1)
                            }}
                        >
                            Geri
                        </button>
                        <button
                            onClick={() => {
                                try{
                                    fetch(`https://write-log-app.vercel.app/log?log=${page === 0 ? 'Sayfa 1 ada bilmece ' : page === 1 ? 'Sayfa 2 kitap bilmece' : 'Sayfa 3 vigenere tablosu'}`)

                                }catch (e){
                                    console.log(e)
                                }
                                window.open('https://sicanzi.com/', '_blank')
                            }}
                            className={'w-[70px] h-[50px] bg-blue-700 active:bg-blue-400 rounded-[3px] text-white font-bold'}>
                            Hint
                        </button>
                        <button
                            className={'w-[70px] h-[50px] bg-blue-700 active:bg-blue-400 rounded-[3px] text-white font-bold'}
                            onClick={() => {
                                if(page < 2)
                                    setPage(page + 1)
                            }}
                        >
                            İleri
                        </button>
                    </div>
                </div>
            </div>
        )
    }, [page]);

    return (
        <>
            {PageRenderer}
        </>
    )

}

export default BirthdayPage