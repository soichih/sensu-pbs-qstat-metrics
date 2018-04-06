#!/usr/bin/env nodejs

const parseString = require('xml2js').parseString;
const fs = require('fs');

const xmlname = process.argv[2];
const graphite_prefix = process.argv[3];

if(!xmlname || !graphite_prefix) { 
    console.error("usage: sensu-pbs-qstat-metrics.js <qstatxml> <graphite_prefix>");
    process.exit(1);
}

const thexml = fs.readFileSync(xmlname, "ascii");
parseString(thexml, (err,stats)=>{
    if(err) throw err;
    const jobs = stats.Data.Job;
    if(!jobs) return; //no jobs?

    let states = [];
    jobs.forEach(job=>{
        if(states[job.job_state] === undefined) states[job.job_state] = 1; 
        else states[job.job_state]++;
    });

    let time = Math.round(new Date().getTime()/1000);
    for(var state in states) {
        console.log(graphite_prefix+".job_state."+state+" "+states[state]+" "+time);
    }
});
