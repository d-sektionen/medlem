import logo from './img/logo.png';

const padding = (size) => ({
    paddingTop: () => size,
    paddingBottom: () => size,
    paddingLeft: () => size,
    paddingRight: () => size
});


const lineWidth = (h, v = h) => ({
    vLineWidth: () => v,
    hLineWidth: () => h,
});

// ne is short for not empty, will replace empty string with a space. and now also an integer 0 
const ne = (string) =>  string && `${string}`.length && string !== 0 ? string : ' ';

export default options => ({

    info: {
        title: 'Räkning till Datateknologsektionen',
        author: 'D-sektionen',
        subject: '',
        keywords: '',
    },
    pageMargins: [40, 150, 40, 90],
    header: {
            //text: 'meme',
            image: logo,
            width: 550,
            alignment: 'center'
    },
    content: [
        {text: 'Räkning till Datateknologsektionen', style: 'header'},
        {text: 'Använd denna blankett om du har utgifter du vill ha ersättning för. Kvitton sätts fast på baksidan av detta papper.', margin: [0,12] },
        {
            table: {
            widths: ['*', 'auto', 80, 80],
            headerRows: 1,
            body: [
                [
                { text: 'Specifikation', style: 'tableHeader' },
                { text: 'Antal', style: 'tableHeader' },
                { text: 'Pris', style: 'tableHeader' },
                { text: 'Summa', style: 'tableHeader' }
                ],
                ...Object.keys(options.items).map(key => [ne(options.items[key].spec), ne(options.items[key].count), ne(options.items[key].price), ne(options.items[key].sum)]),
                [
                {
                    colSpan: 2,
                    border: [false, false, false, false],
                    text: ''
                },
                '',
                {
                    text: 'Totalt:',
                    style: 'tableHeader',
                    border: [false, false, false, false]
                },
                ne(options.total)
                ]
            ]
            },
            layout: padding(6)
        },
        {
            table: {
            widths: ['auto', '*'],
            body: [
                [
                { text: 'Ändamål med inköpet:', margin: [0,24,6,0], bold: true },
                { text: ne(options.purpose.split('\n')[0]), margin: [0,24,0,0], border: [false, false, false, true] }
                ],
                [
                {
                    colSpan: 2,
                    margin: [0,18,0,0],
                    border: [false, false, false, true],
                    text: ne(options.purpose.split('\n')[1])
                },
                ' '
                ]
            ]
            },
            layout: {
            ...padding(0),
            defaultBorder: false,
            }
        },
        {
            table: {
            body: [
                [
                [
                    {text: 'Kontouppgifter för överföring', bold: true},
                    {
                    table: {
                        widths: ['auto', 200],
                        body: [
                        [{text: 'Clearing-nr:', margin: [0,12,6,0]}, {
                            border: [false, false, false, true],
                            text: ne(options.clearing),
                            margin: [0,12,0,0]
                        }],
                        [{text: 'Konto-nr:', margin: [0,12,6,0]}, {
                            border: [false, false, false, true],
                            text: ne(options.account),
                            margin: [0,12,0,0]
                        }],
                        [{text: 'Bank:', margin: [0,12,6,0]}, {
                            border: [false, false, false, true],
                            text: ne(options.bank),
                            margin: [0,12,0,0]
                        }]
                        ]
                    },
                    layout: {
                        ...padding(0),
                        ...lineWidth(1, 0),
                        defaultBorder: false,
                    }
                    }
                ]
                ]
            ]
            },
            layout: padding(12),
            margin: [0, 24, 0, 12]
        },
        'Genom att skriva under intygar jag att ovanstående är korrekt och sanningsenligt samt att sektionen lagrar informationen i detta formulär tillsvidare i bokföringssyfte.',
        {
            table: {
            widths: ['*', 12 , '*'],
            body: [
                [ ne(options.name), '', '' ],
                [ { text: 'Namn', border: [false, true, false, false], margin: [0,0,0,20] }, '', { text: 'Ort', border: [false, true, false, false] }],
                [ { text: 'Underskrift', border: [false, true, false, false] }, '', { text: 'Datum', border: [false, true, false, false] }]
            ]
            },
            layout: {
            defaultBorder: false
            },
            margin: [0, 20, 0,0]
        }
    ],
    footer:
        {
        table: {
            widths: ['33%','*', '33%'],
            body: [
            [
                { stack: [{ text: 'Postadress', bold: true },
                'Datateknologsektionen',
                'Kårallen, Universitetet',
                '581 83 Linköping'], border: [false, true, false, false] },
                { stack: [{ text: 'Organisations-nr', bold: true },
                '822002-1409',
                { text: 'BankGiro-nr', bold: true },
                '5644-8251'], border: [false, true, false, false] },
                { stack: [
                { text: 'Telefon', bold: true },
                '013-31 07 78',
                { text: 'Hemsida', bold: true },
                'www.d-sektionen.se'
                ], border: [false, true, false, false] }
            ]
            ],
        }, margin: [40, 0]
        },
        styles: {
        header: {
            fontSize: 18,
            bold: true
        },
        tableHeader: {
            fontSize: 13,
            bold: true,
            alignment: 'center'
        }
        }
    //pageOrientation: 'portrait',
    //pageSize: 'A4'
});