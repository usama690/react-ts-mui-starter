import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs

interface IPageOptions {
    pageOrientation?: 'landscape' | 'portrait'
    pageSize?: {
        width: number
        height: number
    }
}

export const generatePDF = (
    content: Array<Record<string, unknown>>,
    info?: Record<string, unknown>,
    pageOptions?: IPageOptions
): void => {
    const pdfDocGenerator = pdfMake.createPdf({
        pageMargins: [20, 20, 20, 110],
        pageSize: 'A4',
        info,
        content,
        ...pageOptions,
        styles: {
            mainHeading: {
                fontSize: 22,
                bold: true,
            },
            subHeading: {
                fontSize: 12,
                bold: true,
            },
            center: {
                alignment: 'center',
            },
            right: {
                alignment: 'right',
            },
        },

        defaultStyle: {
            fontSize: 9,
            bold: true,
        },
    })
    pdfDocGenerator.getBlob((blob) => {
        const fileURL = URL.createObjectURL(blob)
        window.open(fileURL)
    })
}
