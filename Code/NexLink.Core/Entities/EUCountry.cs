using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Table("EUCountry")]
[Index("EuCountryCode", Name = "UQ_EUCountry_Code", IsUnique = true)]
public partial class EUCountry
{
    [Key]
    [Column("EUCountryID")]
    public Guid EuCountryId { get; set; }

    [Column("EUCountryCode")]
    [StringLength(5)]
    public string EuCountryCode { get; set; } = null!;

    [Column("EUCountryName")]
    [StringLength(100)]
    public string EuCountryName { get; set; } = null!;
}
