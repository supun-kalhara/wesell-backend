const mongoose = require('mongoose');
const { ReportType } = require('./constants.js') 

const ReportSchema = mongoose.Schema(
    {

        category: {
            type: String,
            enum: [ ReportType.FRAUD, ReportType.SPAM, ReportType.FALSE_ADVERTISING, ReportType.OFFENSIVE],
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        item: {
            type:mongoose.Schema.Types.ObjectId, 
            ref: 'Item',
            required: true,
        }

    },
    {
        timestamps: true
    },
);

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;