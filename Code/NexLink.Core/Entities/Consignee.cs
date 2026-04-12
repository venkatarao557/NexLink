using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Table("Consignee")]
public partial class Consignee
{
    [Key]
    [Column("ID")]
    public Guid Id { get; set; }

    [StringLength(50)]
    public string? Name { get; set; }

    [StringLength(100)]
    public string? AddressLine1 { get; set; }

    [StringLength(100)]
    public string? AddressLine2 { get; set; }

    [StringLength(100)]
    public string? AddressLine3 { get; set; }

    [StringLength(100)]
    public string? City { get; set; }

    [StringLength(20)]
    public string? State { get; set; }

    [StringLength(10)]
    public string? PostCode { get; set; }

    [StringLength(2)]
    public string? CountryCode { get; set; }

    [StringLength(100)]
    public string? Representative { get; set; }

    [StringLength(20)]
    public string? PhoneNbr { get; set; }

    public string? Email { get; set; }
}
