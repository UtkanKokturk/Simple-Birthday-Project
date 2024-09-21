import React, { useMemo, useState } from "react";
import vigenereTable from "../vigenereTable.jpg";

interface BirthdayData {
    riddle?: string;
    bookName?: string;
    pagePuzzle?: string;
    vigenereLink?: string;
    vigenereImage?: string;
}

const Riddles: BirthdayData[] = [
    {
        riddle: 'Küçük bir Ada, kitaplarla dolu, okumak için gidersin oraya.\n' +
            ' Neresi burası, bir an önce koyul yola.',
    },
    {
        bookName: "Kendime Düşünceler - Marcus Aurelius",
        riddle: 'Bir yaprak fısıldar, bir satır bekler, bir harf parlar geceden,\n' +
            'Üç sayının rehberliğinde çözersen bulursun gerçeği derinden.',
        pagePuzzle: '26-9-12\n31-10-13\n44-15-34\n56-1-2\n65-22-28\n72-16-14\n73-20-1\n88-4-12'
    },
    {
        vigenereLink: 'https://en.wikipedia.org/wiki/Blaise_de_Vigen%C3%A8re',
        vigenereImage: '../vigenereTable.jpg'
    }
];

const BirthdayPage: React.FC = () => {
    const [page, setPage] = useState<number>(0);

    const PageRenderer = useMemo(() => {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-[700px] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 space-y-6">
                        {page === 0 && (
                            <div className="text-center">
                                <h1 className="text-lg sm:text-xl font-bold tracking-wide whitespace-pre-line">{Riddles[0].riddle}</h1>
                            </div>
                        )}
                        {page === 1 && (
                            <div className="space-y-4 text-center">
                                <h1 className="text-lg sm:text-xl font-bold tracking-wide whitespace-pre-line">{Riddles[1].riddle}</h1>
                                <p className="text-sm font-bold tracking-wide">{Riddles[1].bookName}</p>
                                <p className="text-xs sm:text-sm font-bold tracking-wide whitespace-pre-line">
                                    {Riddles[1].pagePuzzle}
                                </p>
                            </div>
                        )}
                        {page === 2 && (
                            <div className="space-y-4 text-center">
                                <a href={Riddles[2].vigenereLink} target="_blank" rel="noopener noreferrer"
                                   className="text-blue-600 underline text-sm font-bold tracking-wide">
                                    {'Hmmm Bu ne olabilir?'}
                                </a>
                                <p className="text-xs sm:text-sm font-bold tracking-wide whitespace-pre-line">
                                    {'Şifreli mesaj: jqfci.ioz/CGR1Xti \n' + "Key: ???"}

                                </p>
                                <img src={vigenereTable} alt={'Vigenere Table'} className="w-full max-w-[500px] h-auto mx-auto" />
                            </div>
                        )}
                    </div>
                    <div className="p-4 flex justify-between items-center bg-gray-200">
                        <button
                            className="px-4 py-2 bg-blue-700 active:bg-blue-400 rounded text-white font-bold text-sm"
                            onClick={() => page > 0 && setPage(page - 1)}
                            disabled={page === 0}
                        >
                            Geri
                        </button>
                        <button
                            onClick={() => {
                                try {
                                    fetch(`https://write-log-app.vercel.app/log?log=${page === 0 ? 'Sayfa 1 ada bilmece ' : page === 1 ? 'Sayfa 2 kitap bilmece' : 'Sayfa 3 vigenere tablosu'}`)
                                } catch (e) {
                                    console.log(e)
                                }
                                window.open('https://sicanzi.com/', '_blank')
                            }}
                            className="px-4 py-2 bg-blue-700 active:bg-blue-400 rounded text-white font-bold text-sm"
                        >
                            Hint
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-700 active:bg-blue-400 rounded text-white font-bold text-sm"
                            onClick={() => page < 2 && setPage(page + 1)}
                            disabled={page === 2}
                        >
                            İleri
                        </button>
                    </div>
                </div>
            </div>
        );
    }, [page]);

    return <>{PageRenderer}</>;
};

export default BirthdayPage;