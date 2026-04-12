using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Keyless]
[Table("REXConsignee")]
public partial class Rexconsignee
{
    [StringLength(35)]
    public string ExporterRef { get; set; } = null!;

    [StringLength(35)]
    public string? ConsigneeCity { get; set; }

    [StringLength(2)]
    public string? ConsigneeCountry { get; set; }

    [StringLength(50)]
    public string ConsigneeName { get; set; } = null!;

    [StringLength(10)]
    public string? ConsigneePostCode { get; set; }

    [StringLength(35)]
    public string? ConsigneeRep { get; set; }

    [StringLength(20)]
    public string? ConsigneeState { get; set; }

    [StringLength(35)]
    public string? ConsigneeStreet1 { get; set; }

    [StringLength(35)]
    public string? ConsigneeStreet2 { get; set; }

    [Column("RFPNbr")]
    public int? Rfpnbr { get; set; }

    [StringLength(254)]
    public string? ConsigneeRefNbr { get; set; }

    [StringLength(35)]
    public string? DeclaringAgentNbr { get; set; }

    [StringLength(20)]
    public string? ConsigneePhoneNbr { get; set; }

    [StringLength(20)]
    public string? ConsigneeEmail { get; set; }

    [Column("ConsigneeTRACESApprovalID")]
    [StringLength(255)]
    public string? ConsigneeTracesapprovalId { get; set; }
}
