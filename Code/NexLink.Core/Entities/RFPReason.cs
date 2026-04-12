using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Table("RFPReason")]
[Index("ReasonCode", Name = "UQ_RFPReason_Code", IsUnique = true)]
public partial class RFPReason
{
    [Key]
    [Column("ReasonID")]
    public Guid ReasonId { get; set; }

    public int ReasonCode { get; set; }

    [StringLength(100)]
    public string Description { get; set; } = null!;
}
