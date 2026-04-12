using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Table("CustomsWeightUnit")]
[Index("WeightUnit", Name = "UQ_CustomsWeight_Code", IsUnique = true)]
public partial class CustomsWeightUnit
{
    [Key]
    [Column("CustomsWeightID")]
    public Guid CustomsWeightId { get; set; }

    [StringLength(10)]
    public string WeightUnit { get; set; } = null!;
}
