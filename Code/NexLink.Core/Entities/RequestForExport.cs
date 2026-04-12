using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Keyless]
[Table("RequestForExport")]
public partial class RequestForExport
{
    [StringLength(35)]
    public string ExporterRef { get; set; } = null!;

    [Column("AMLCQuotaInd")]
    [StringLength(1)]
    public string? AmlcquotaInd { get; set; }

    [Column("AQISComments")]
    [StringLength(210)]
    public string? Aqiscomments { get; set; }

    public int? AuthorityNbr { get; set; }

    [StringLength(1)]
    public string? CustomsAgentInd { get; set; }

    [Precision(0)]
    public DateTime? DepartureDate { get; set; }

    [StringLength(50)]
    public string? DestCity { get; set; }

    [StringLength(2)]
    public string? DestCountry { get; set; }

    [Column("DPIESealStrNbr")]
    [StringLength(7)]
    public string? DpiesealStrNbr { get; set; }

    [Column("DPIESealEndNbr")]
    [StringLength(7)]
    public string? DpiesealEndNbr { get; set; }

    [Column("ECNStatus")]
    [StringLength(1)]
    public string? Ecnstatus { get; set; }

    [StringLength(1)]
    public string? EmbargoStatus { get; set; }

    [StringLength(79)]
    public string? EmbargoMessage { get; set; }

    [StringLength(2)]
    public string? EmbargoCode { get; set; }

    [Column("EXDOCProdGrp")]
    [StringLength(1)]
    public string? ExdocprodGrp { get; set; }

    [StringLength(255)]
    public string? ExporterDeclartion { get; set; }

    [StringLength(1)]
    public string? ExporterType { get; set; }

    [StringLength(10)]
    public string? ExportPermitNbr { get; set; }

    [Column("FOBCurrencyUnit")]
    [StringLength(3)]
    public string? FobcurrencyUnit { get; set; }

    [StringLength(4)]
    public string? ForwardStatus { get; set; }

    [Column("HCPrintInd")]
    [StringLength(1)]
    public string? HcprintInd { get; set; }

    [Precision(0)]
    public DateTime? InspectStartDate { get; set; }

    [Precision(0)]
    public DateTime? InspectDate { get; set; }

    [StringLength(12)]
    public string? InspectEstabNum { get; set; }

    [StringLength(210)]
    public string? InspectorComments { get; set; }

    [Precision(0)]
    public DateTime? InspectReqDate { get; set; }

    [StringLength(8)]
    public string? InspectUserId { get; set; }

    [Column("LastAmendDTTM")]
    [Precision(0)]
    public DateTime? LastAmendDttm { get; set; }

    [Column("LodgementDTTM")]
    [Precision(0)]
    public DateTime? LodgementDttm { get; set; }

    [StringLength(5)]
    public string? OwnerExporterNbr { get; set; }

    [Column("PrevEDIUserId")]
    public int? PrevEdiuserId { get; set; }

    [StringLength(5)]
    public string? PrevExporterNbr { get; set; }

    [StringLength(2)]
    public string? ProdSourceCountry { get; set; }

    [Column("PropEDIUserId")]
    public int? PropEdiuserId { get; set; }

    [StringLength(5)]
    public string? PropExporterNbr { get; set; }

    [StringLength(6)]
    public string? RegionCode { get; set; }

    [Column("REXNbr")]
    public int? Rexnbr { get; set; }

    [Column("REXStatus")]
    [StringLength(4)]
    public string? Rexstatus { get; set; }

    [Column("REXStatusDTTM")]
    [Precision(0)]
    public DateTime? RexstatusDttm { get; set; }

    [Column("SepHCContainFlag")]
    [StringLength(1)]
    public string? SepHccontainFlag { get; set; }

    [Column("SepHCMarksFlag")]
    [StringLength(1)]
    public string? SepHcmarksFlag { get; set; }

    [Column("SepHCPackerFlag")]
    [StringLength(1)]
    public string? SepHcpackerFlag { get; set; }

    [StringLength(35)]
    public string? ShippingCompany { get; set; }

    [StringLength(1)]
    public string? ShipStoresFlag { get; set; }

    public double? StoreTransTemp { get; set; }

    public double? StoreTransTempMin { get; set; }

    [StringLength(3)]
    public string? StoreTransTempUnit { get; set; }

    [StringLength(1)]
    public string? TransferFlag { get; set; }

    [StringLength(1)]
    public string? TransportMode { get; set; }

    [StringLength(35)]
    public string? VesselName { get; set; }

    [StringLength(6)]
    public string? VoyageNbr { get; set; }

    [StringLength(14)]
    public string? ExportClrnceNbr { get; set; }

    [StringLength(7)]
    public string? PrintLocation { get; set; }

    [StringLength(10)]
    public string? MessageType { get; set; }

    public bool? QueryFlag { get; set; }

    [StringLength(1)]
    public string? QueuedFlag { get; set; }

    [StringLength(1)]
    public string? ValidationFlag { get; set; }

    [StringLength(2)]
    public string? AcceptTransfer { get; set; }

    [StringLength(1)]
    public string? CancelTransFlag { get; set; }

    [Precision(0)]
    public DateTime? PackingDate { get; set; }

    [StringLength(5)]
    public string? BorderInspectionPort { get; set; }

    [StringLength(6)]
    public string? StorageEstabNum { get; set; }

    [StringLength(255)]
    public string? LotNbrs { get; set; }

    [StringLength(1)]
    public string? DeclOfCompliance { get; set; }

    [StringLength(1)]
    public string? ImportedProdFlag { get; set; }

    [StringLength(1)]
    public string? TrueAndCompleteInd { get; set; }

    [StringLength(3)]
    public string? ProductUseInd { get; set; }

    [StringLength(5)]
    public string? ApprovedCertifier { get; set; }

    [StringLength(254)]
    public string? AmendedInformation { get; set; }

    [StringLength(20)]
    public string? AverageAgeOfAnimal { get; set; }

    [Column("AMLCQuotaYear")]
    [StringLength(7)]
    public string? AmlcquotaYear { get; set; }
}
