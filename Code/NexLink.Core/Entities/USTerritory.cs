using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Table("USTerritory")]
[Index("CountryCode", Name = "UQ_USTerritory_Code", IsUnique = true)]
public partial class USTerritory
{
    [Key]
    [Column("USTerritoryID")]
    public Guid USTerritoryId { get; set; }

    [StringLength(2)]
    [Unicode(false)]
    public string CountryCode { get; set; } = null!;

    [StringLength(100)]
    public string CountryName { get; set; } = null!;
}
