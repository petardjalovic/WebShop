using System.Runtime.Serialization;

namespace Core.Entities.OrderAgregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        pending,
        [EnumMember(Value = "Payment Recived")]
        paymentRecived,
        [EnumMember(Value = "Payment Failed")]
        paymentFailed,

    }
}
