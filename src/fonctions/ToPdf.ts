import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generate Draft Survey PDF Report
 */
export const generateDraftSurveyPDF = (data: any) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text('DRAFT SURVEY REPORT', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text(`Vessel: ${data.vesselName || 'N/A'}`, 20, 40);
    doc.text(`Port: ${data.port || 'N/A'}`, 20, 45);
    doc.text(`Date: ${data.date || 'N/A'}`, 20, 50);
    
    // Table Placeholder
    (doc as any).autoTable({
        startY: 60,
        head: [['Item', 'Initial', 'Final', 'Unit']],
        body: [
            ['Mean Draft', '10.50', '12.80', 'm'],
            ['Displacement', '25000', '32000', 'MT'],
            ['Deductibles', '1200', '1250', 'MT'],
            ['Net Displacement', '23800', '30750', 'MT'],
        ],
    });
    
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.text(`TOTAL CARGO: ${data.cargoTotal || '0'} MT`, 105, finalY, { align: 'center' });
    
    // Signatures
    doc.setFontSize(10);
    doc.text('__________________', 40, finalY + 40);
    doc.text('Master / Officer', 40, finalY + 45);
    
    doc.text('__________________', 140, finalY + 40);
    doc.text('Surveyor', 140, finalY + 45);
    
    doc.save(`Draft_Survey_${data.vesselName || 'Report'}.pdf`);
};
