const PDFDocument = require('pdfkit');
const { Attendance } = require("../models");
const { Assignments } = require("../models");
const { Workers } = require("../models");
const express = require('express');
const router = express.Router();

const generateattendancePDF = () => {
    return new Promise(async (resolve, reject) => {
        const today = new Date();

        const attendanceRecords = await Attendance.findAll();

        const assignmentRecords = await Assignments.findAll();


        // Create new PDF document
        const doc = new PDFDocument();

        // Set document metadata
        doc.info.Title = 'Attendance and Assignments';

        doc.fontSize(18).text('Attendance Records for ' + today.toLocaleDateString(), { align: 'center' });
        doc.moveDown();
        doc.fontSize(12);
        doc.font('Courier').text(`Worker ID       Present/absent`);

        for (const record of attendanceRecords) {
            console.log(record.WorkerWorkerID, record.present);
            doc.font('Courier').text(`${record.WorkerWorkerID}             ${record.present}`);
        }

        doc.moveDown();

        // Add assignment table to PDF
        doc.fontSize(18).text('Manpower Need', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12);
        doc.font('Courier').text(`WorkeplaceID       Workplacetype`);

        for (const record of assignmentRecords) {
            console.log(record.assignedWorkplace);
            doc.font('Courier').text(`${record.assignedWorkplace}                  ${record.workplaceType}`);
        }

        doc.end();

        const buffers = [];
        doc.on('data', buffer => buffers.push(buffer));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);
    });
};

const generateKPIPDF = () => {
    return new Promise(async (resolve, reject) => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        //if (today.getDate() === 1) {
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const workerList = await Workers.findAll();

        // Create new PDF document
        const doc = new PDFDocument();

        // Pipe PDF document to a writable stream and attach it to response

        // Set document metadata
        doc.info.Title = 'KPI Report of workers';

        doc.fontSize(18).text('Employee Details for ' + previousMonth + '/' + previousYear, { align: 'center' });

        doc.moveDown();
        doc.fontSize(12);
        doc.font('Courier').text('Employee Name     Employee ID     Specialization     KPI');

        for (const worker of workerList) {
            const { workerID, workerName, specialization, kpi } = worker;
            const kpiPrint = kpi === null ? 0 : kpi.toPrecision(2);
            doc.font('Courier').text(`${workerName.substr(0, 8)}              ${workerID}           ${specialization}        ${kpiPrint}`);
        }

        // Finalize and end the document
        doc.end();

        const buffers = [];
        doc.on('data', buffer => buffers.push(buffer));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);
        //} else {
        // resolve();//not end of month
        //  }

    });
}


router.get('/manpower-report', async (req, res) => {
    await generateattendancePDF(req, res)
        .then(pdf => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=attendance_and_assignments.pdf');
            res.send(pdf);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('PDF generation failed');
        });
});


router.get('/kpi-report', async (req, res) => {
    await generateKPIPDF(req, res)
        .then(pdf => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=attendance_and_assignments.pdf');
            res.send(pdf);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('PDF generation failed');
        });
})

module.exports = router;
