import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { calculateSGSCorrectedDrafts, calculateSGSMiddleMeans, sumDeductibles } from './draftSurveyUtils';

const safeNum = (v) => (isFinite(v) && !isNaN(v) ? v : 0);

const fmtNum3 = (v) => isFinite(v) ? Number(v).toFixed(3) : '0.000';

const computeStep = (stepData, particulars) => {
  const corr = calculateSGSCorrectedDrafts(stepData.drafts, particulars);
  const { quarterMean } = calculateSGSMiddleMeans(corr.fwd.corrected, corr.mid.corrected, corr.aft.corrected);
  const h = stepData.hydrostatics;
  const lbp = safeNum(particulars.lbp) || 1;
  const trimCorrected = safeNum(corr.aft.corrected - corr.fwd.corrected);
  const firstTrimCorr = safeNum((trimCorrected * 100 * safeNum(h.tpc) * safeNum(h.lcf)) / lbp);
  const secondTrimCorr = safeNum((trimCorrected ** 2 * 50 * safeNum(h.mtc)) / lbp);
  const trimCorr = trimCorrected !== 0 ? firstTrimCorr + secondTrimCorr : 0;
  const corrDisplTrim = safeNum(h.displacement) + trimCorr;
  const density = safeNum(stepData.density) || 1.025;
  const densityCorrDispl = safeNum(corrDisplTrim * (density / 1.025));
  const deducts = safeNum(sumDeductibles(stepData.deductibles));
  const net = safeNum(densityCorrDispl - deducts);
  
  return {
    corr,
    quarterMean: safeNum(quarterMean),
    trimCorrected,
    firstTrimCorr, 
    secondTrimCorr,
    trimCorr,
    corrDisplTrim,
    densityCorrDispl,
    deducts,
    net
  };
};

export const generateDraftSurveyPDF = async (survey) => {
  const { informations, particulars, initial, final } = survey;
  const isLoading = informations.operationType === 'Loading';

  const initialRes = computeStep(initial, particulars);
  const finalRes = computeStep(final, particulars);
  
  const netLight = isLoading ? initialRes.net : finalRes.net;
  const netLoaded = isLoading ? finalRes.net : initialRes.net;
  const cargoWeight = safeNum(netLoaded - netLight);
  
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  const margin = 8;
  let y = 10;

  // PETIT LOGO haut gauche
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('GH', margin, 16);
  doc.setFontSize(6);
  doc.text('MarineSurveyDev', margin, 21);

  // HEADER
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
   doc.text('DRAFT SURVEY REPORT', pageWidth/2, 18, { align: 'center' });
  
  // Ligne de séparation horizontale sous l'en-tête
  doc.setLineWidth(0.5);
  doc.setDrawColor(0);
  doc.line(margin, 25, pageWidth - margin, 25);
  
  y = 40;

  // VESSEL INFO + PARTICULARS (2 colonnes, même ligne)
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  
  doc.setFont('helvetica', 'normal');
  // Col 1 - INFO
  doc.text(`Vessel: ${informations.vesselName || ''}`, margin, y); y += 4;
  doc.text(`Current Port: ${informations.currentPort || ''}`, margin, y); y += 4;
  doc.text(`Operation: ${informations.operationType}`, margin, y); y += 4;
  doc.text(`BL Weight: ${fmtNum3(safeNum(informations.blWeight))} MT`, margin, y); y += 4;
  doc.text(`Port Load: ${informations.portLoading}`, margin, y); y += 4;
  doc.text(`Port Discharge: ${informations.portDischarging}`, margin, y); y += 4;
  doc.text(`Arrived: ${informations.arrivedDate || ''} ${informations.arrivedTime || ''}`, margin, y); y += 4;
  doc.text(`Berthed: ${informations.berthedDate || ''} ${informations.berthedTime || ''}`, margin, y); y += 4;
  
  const getSurveyTime = (d) => {
    if (d.commencedDate) {
      const endPart = d.completedDate && d.completedDate !== d.commencedDate 
        ? ` - ${d.completedDate} ${d.completedTime || ''}` 
        : (d.completedTime ? ` - ${d.completedTime}` : '');
      return `${d.commencedDate} ${d.commencedTime || ''}${endPart}`;
    }
    
    let t = '';
    if (d.timeStart) {
      t = d.timeEnd ? `${d.timeStart} - ${d.timeEnd}` : d.timeStart;
    } else {
      t = d.time || '';
    }
    return `${d.date || ''} ${t}`;
  };

  // Reset Y col 2
  y = 40;
  doc.text(`IMO: ${informations.imo || ''}`, pageWidth/2 + 8, y); y += 4;
  doc.text(`Client: ${informations.client || ''}`, pageWidth/2 + 8, y); y += 4;
  doc.text(`Product: ${informations.product || ''}`, pageWidth/2 + 8, y); y += 4;
  doc.text(`LBP: ${fmtNum3(safeNum(particulars.lbp))} m`, pageWidth/2 + 8, y); y += 4;
  y += 4; // Espace vertical
  doc.text(`Initial Survey: ${getSurveyTime(initial)}`, pageWidth/2 + 8, y); y += 4;
  doc.text(`Final Survey:   ${getSurveyTime(final)}`, pageWidth/2 + 8, y); y += 6;
  y = 95;

  // TOUTE LA TABLE CALCULS (compacte 7pt, 3 décimales)
  const fmtNum = fmtNum3;
  const tableData = [
    // DRAFTS
    ['FWD Port', 'm', initial.drafts.fwdPort, final.drafts.fwdPort],
    ['FWD Stbd', 'm', initial.drafts.fwdStbd, final.drafts.fwdStbd],
    ['FWD Mean', 'm', initialRes.corr.fwd.mean, finalRes.corr.fwd.mean],
    ['FWD Correction (Auto)', 'm', initialRes.corr.fwd.autoCorr, finalRes.corr.fwd.autoCorr],
    ['FWD Corrected', 'm', initialRes.corr.fwd.corrected, finalRes.corr.fwd.corrected],
    ['MID Port', 'm', initial.drafts.midPort, final.drafts.midPort],
    ['MID Stbd', 'm', initial.drafts.midStbd, final.drafts.midStbd],
    ['MID Mean', 'm', initialRes.corr.mid.mean, finalRes.corr.mid.mean],
    ['MID Correction (Auto)', 'm', initialRes.corr.mid.autoCorr, finalRes.corr.mid.autoCorr],
    ['MID Corrected', 'm', initialRes.corr.mid.corrected, finalRes.corr.mid.corrected],
    ['AFT Port', 'm', initial.drafts.aftPort, final.drafts.aftPort],
    ['AFT Stbd', 'm', initial.drafts.aftStbd, final.drafts.aftStbd],
    ['AFT Mean', 'm', initialRes.corr.aft.mean, finalRes.corr.aft.mean],
    ['AFT Correction (Auto)', 'm', initialRes.corr.aft.autoCorr, finalRes.corr.aft.autoCorr],
    ['AFT Corrected', 'm', initialRes.corr.aft.corrected, finalRes.corr.aft.corrected],
    
    // MEANS
    ['Quarter Mean', 'm', initialRes.quarterMean, finalRes.quarterMean],
    
    // TRIM/HYDRO
    ['Trim Amount', 'm', initialRes.trimCorrected, finalRes.trimCorrected],
    ['1st Trim Corr', 'MT', initialRes.firstTrimCorr, finalRes.firstTrimCorr],
    ['2nd Trim Corr', 'MT', initialRes.secondTrimCorr, finalRes.secondTrimCorr],
    ['Total Trim', 'MT', initialRes.trimCorr, finalRes.trimCorr],
    ['Disp Table', 'MT', initial.hydrostatics.displacement, final.hydrostatics.displacement],
    
    // FINAL
    ['Trim Disp', 'MT', initialRes.corrDisplTrim, finalRes.corrDisplTrim],
    ['Density Disp', 'MT', initialRes.densityCorrDispl, finalRes.densityCorrDispl],
    ['Deductibles', 'MT', initialRes.deducts, finalRes.deducts],
    ['NET DISPLACEMENT', 'MT', initialRes.net, finalRes.net]
  ];

  autoTable(doc, {
    startY: y,
    head: [['Description', '     Unit', '     INITIAL', '     FINAL']],
    body: tableData.map(row => [row[0], row[1], fmtNum(row[2]), fmtNum(row[3])]),
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 1.2 },
    headStyles: { fillColor: [255,255,255], textColor: [0,0,0], fontSize: 7, fontStyle: 'bold' },
    columnStyles: { 
      0: { cellWidth: 55, halign: 'left' }, 
      1: { cellWidth: 25, halign: 'center' },
      2: { cellWidth: 45, halign: 'center' },
      3: { cellWidth: 45, halign: 'center' }
    },
    margin: { left: margin, right: margin }
  });
  y = doc.lastAutoTable.finalY + 6;

  // CARGO TOTAL (ligne fine)
  doc.setLineWidth(0.3);
  doc.setDrawColor(0);
  doc.line(margin, y, pageWidth-2 * margin, y);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(`${isLoading ? 'CARGO CHARGE' : 'CARGO DÉCHARGE'}:`, margin, y+5);
  doc.setFontSize(12);
  doc.text(fmtNum3(cargoWeight) + ' MT', pageWidth-46 , y+4);
  y += 12;



  // SIGNATURES
  const sigY = 260;
  const sigX1 = margin;
  const sigX2 = pageWidth/2 - 25;
  const sigX3 = pageWidth - margin - 55;
  doc.setLineWidth(0.3);
  doc.line(sigX1, sigY, sigX1+55, sigY);
  doc.line(sigX2, sigY, sigX2+55, sigY);
  doc.line(sigX3, sigY, sigX3+55, sigY);
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.text('Surveyor', sigX1, sigY+3);
  doc.text('witnessing ', sigX2, sigY+3);
  doc.text('Chief Officer', sigX3, sigY+3);
  doc.text('Date/Signature', sigX1, sigY+9);
  doc.text('Date/Signature', sigX2, sigY+9);
  doc.text('Date/Signature', sigX3, sigY+9);

  // DISCLAIMER
  const disclaimerY = 285;
  doc.setLineWidth(0.1);
  doc.line(margin, disclaimerY-2, pageWidth-margin, disclaimerY-2);
  doc.setFontSize(6);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  const disclaimerText = `This Draft Survey Report is issued based on measurements taken in the presence of vessel representatives. All calculations follow standard marine surveying practices. 
GH Marine Surveying assumes no liability for discrepancies arising from vessel data inaccuracies, density variations, or external factors beyond our control. 
This certificate does not constitute a warranty of quantity. Client accepts all measurements as-is and waives any legal claims against GH Marine Surveying.`;
  doc.text(disclaimerText, margin, disclaimerY, { maxWidth: pageWidth - 2*margin });

  doc.save(`DS_${(informations.vesselName || 'Report').replace(/[^a-zA-Z0-9]/g, '')}_${new Date().toISOString().slice(0,10)}.pdf`);
};
