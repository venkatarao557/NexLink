using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Table("EUCountry")]
public partial class EUCountry
{
    [Key]
    [Column("EUCountryID")]
    public Guid EUCountryID { get; set; }

    [Column("EUCountryCode")]
    [StringLength(5)]
    public string EUCountryCode { get; set; } = null!;

    [Column("EUCountryName")]
    [StringLength(100)]
    public string EUCountryName { get; set; } = null!;
}
