Class fhircenter.Token Extends %Persistent
{

Property AccessToken As %String(MAXLEN = 500);

Property ExpiresIn As %Integer;

Property TokenType As %String;

Property Scope As %String(MAXLEN = "");

Property RefreshToken As %String(MAXLEN = 500);

Property UserId As %String;

Storage Default
{
<Data name="TokenDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>AccessToken</Value>
</Value>
<Value name="3">
<Value>RefreshToken</Value>
</Value>
<Value name="4">
<Value>ExpiresIn</Value>
</Value>
<Value name="5">
<Value>TokenType</Value>
</Value>
<Value name="6">
<Value>Scope</Value>
</Value>
<Value name="7">
<Value>UserId</Value>
</Value>
</Data>
<DataLocation>^fhircenter.TokenD</DataLocation>
<DefaultData>TokenDefaultData</DefaultData>
<IdLocation>^fhircenter.TokenD</IdLocation>
<IndexLocation>^fhircenter.TokenI</IndexLocation>
<StreamLocation>^fhircenter.TokenS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
